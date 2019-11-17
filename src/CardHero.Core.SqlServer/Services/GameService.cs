using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;
using CardHero.Data.Abstractions;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class GameService : BaseService, IGameService
    {
        private readonly IGameValidator _gameValidator;

        private readonly IDeckRepository _deckRepository;
        private readonly IGameDeckRepository _gameDeckRepository;
        private readonly IGameRepository _gameRepository;
        private readonly IGameUserRepository _gameUserRepository;
        private readonly ITurnRepository _turnRepository;

        private readonly IDataMapper<GameData, GameModel> _gameMapper;
        private readonly IDataMapper<GameCreateData, GameCreateModel> _gameCreateMapper;
        private readonly IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel> _gameDeckCardCollectionMapper;
        private readonly IDataMapper<GameDeckData, GameDeckModel> _gameDeckMapper;
        private readonly IDataMapper<GameUserData, GameUserModel> _gameUserMapper;

        private readonly ICardService _cardService;

        public GameService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            IGameValidator gameValidator,
            IDeckRepository deckRepository,
            IGameDeckRepository gameDeckRepository,
            IGameRepository gameRepository,
            IGameUserRepository gameUserRepository,
            ITurnRepository turnRepository,
            IDataMapper<GameData, GameModel> gameMapper,
            IDataMapper<GameCreateData, GameCreateModel> gameCreateMapper,
            IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel> gameDeckCardCollectionMapper,
            IDataMapper<GameDeckData, GameDeckModel> gameDeckMapper,
            IDataMapper<GameUserData, GameUserModel> gameUserMapper,
            ICardService cardService
        )
            : base(contextFactory)
        {
            _gameValidator = gameValidator;

            _deckRepository = deckRepository;
            _gameDeckRepository = gameDeckRepository;
            _gameRepository = gameRepository;
            _gameUserRepository = gameUserRepository;
            _turnRepository = turnRepository;

            _gameMapper = gameMapper;
            _gameCreateMapper = gameCreateMapper;
            _gameDeckCardCollectionMapper = gameDeckCardCollectionMapper;
            _gameDeckMapper = gameDeckMapper;
            _gameUserMapper = gameUserMapper;

            _cardService = cardService;
        }

        private async Task<GameUserModel> AddUserToGameInternalAsync(int id, int userId, int deckId, CancellationToken cancellationToken = default)
        {
            var game = await _gameRepository.GetGameByIdAsync(id);

            if (game == null)
            {
                throw new InvalidGameException($"Game { id } does not exist.");
            }

            var gameUsers = await _gameRepository.GetGameUsersAsync(id, cancellationToken: cancellationToken);

            if (gameUsers.Any(x => x.UserId == userId))
            {
                throw new InvalidPlayerException($"User { userId } is already in game { id }.");
            }

            var gul = gameUsers.Length;
            if (gul >= game.MaxPlayers)
            {
                throw new InvalidPlayerException($"Game { id } is already filled.");
            }

            var deck = await _deckRepository.GetDeckByIdAsync(deckId, cancellationToken: cancellationToken);

            if (deck == null)
            {
                throw new InvalidDeckException($"Deck { deckId } does not exist.");
            }

            if (deck.UserId != userId)
            {
                throw new InvalidDeckException($"Deck { deckId } does not belong to user { userId }.");
            }

            var newGameUser = await _gameUserRepository.AddGameUserAsync(id, userId, cancellationToken: cancellationToken);

            var dc = deck.Cards.Select(x => x.CardId).ToArray();
            var dcc = dc.Count();
            if (dcc < deck.MaxCards)
            {
                throw new InvalidDeckException($"Deck { deckId } needs { deck.MaxCards } cards. Currently only has { dcc }.");
            }

            var newGameDeck = await _gameDeckRepository.AddGameDeckAsync(newGameUser.Id, deck.Name, deck.Description, dc, cancellationToken: cancellationToken);

            if (gul + 1 == game.MaxPlayers)
            {
                var allUsers = gameUsers.Select(x => x.Id).Concat(new int[] { newGameUser.Id }).ToArray();
                var currentUserIdx = new Random().Next(0, allUsers.Length);
                var currentGameUserId = allUsers[currentUserIdx];
                var updateGame = new GameUpdateData
                {
                    CurrentGameUserId = currentGameUserId,
                };

                await _gameRepository.UpdateGameAsync(id, updateGame, cancellationToken: cancellationToken);

                var newTurn = new TurnData
                {
                    CurrentGameUserId = currentGameUserId,
                    GameId = game.Id,
                };
                await _turnRepository.AddTurnAsync(newTurn, cancellationToken: cancellationToken);
            }

            return _gameUserMapper.Map(newGameUser);
        }

        private async Task<Abstractions.SearchResult<GameModel>> GetGamesInternalAsync(Abstractions.GameSearchFilter filter, int? userId = null, CancellationToken cancellationToken = default)
        {
            var result = await _gameRepository.FindGamesAsync(
                new Data.Abstractions.GameSearchFilter
                {
                    GameId = filter.GameId,
                    Type = (Data.Abstractions.GameType?)(int?)filter.Type,
                },
                cancellationToken: cancellationToken
            );

            var results = new Abstractions.SearchResult<GameModel>
            {
                Count = result.TotalCount,
                Results = result.Results.Select(_gameMapper.Map).ToArray(),
            };

            if (userId.HasValue)
            {
                var uid = userId.Value;

                foreach (var game in results.Results)
                {
                    //TODO: Fix loop to no make multiple calls
                    await PopulateGameUsersInternalAsync(game, uid, cancellationToken: cancellationToken);
                }
            }

            return results;
        }

        private async Task PopulateGameUsersInternalAsync(GameModel game, int userId, CancellationToken cancellationToken = default)
        {
            var users = await _gameRepository.GetGameUsersAsync(game.Id, cancellationToken: cancellationToken);
            var userIds = users.Select(x => x.UserId).ToArray();
            game.CanJoin = !game.EndTime.HasValue && userIds.Count() < game.MaxUsers && !userIds.Contains(userId);
            game.CanPlay = !game.EndTime.HasValue && userIds.Contains(userId) && game.CurrentUser?.Id == userId;

            game.Users = users.Select(x => _gameUserMapper.Map(x)).ToArray();
        }

        Task<GameUserModel> IGameService.AddUserToGameAsync(int id, int userId, int deckId, CancellationToken cancellationToken)
        {
            return AddUserToGameInternalAsync(id, userId, deckId, cancellationToken: cancellationToken);
        }

        async Task<GameModel> IGameService.CreateGameAsync(GameCreateModel game, CancellationToken cancellationToken)
        {
            await _gameValidator.ValidateNewGameAsync(game, cancellationToken: cancellationToken);

            var newGameCreate = _gameCreateMapper.Map(game);

            var newGame = await _gameRepository.AddGameAsync(newGameCreate, cancellationToken: cancellationToken);

            if (game.Users != null)
            {
                foreach (var user in game.Users)
                {
                    await AddUserToGameInternalAsync(newGame.Id, user.Id, game.DeckId, cancellationToken: cancellationToken);
                }
            }

            return _gameMapper.Map(newGame);
        }

        async Task<GameModel> IGameService.GetGameByIdAsync(int id, int? userId, CancellationToken cancellationToken)
        {
            var filter = new Abstractions.GameSearchFilter
            {
                GameId = id,
            };
            var game = (await GetGamesInternalAsync(filter, userId: userId, cancellationToken: cancellationToken)).Results.SingleOrDefault();

            if (game == null)
            {
                throw new InvalidGameException($"Game { id } does not exist.");
            }

            if (userId.HasValue)
            {
                await PopulateGameUsersInternalAsync(game, userId.Value, cancellationToken: cancellationToken);
                var gameUser = game.Users.SingleOrDefault(x => x.UserId == userId.Value);

                if (gameUser != null)
                {
                    var gameDeck = await _gameDeckRepository.GetGameDeckByGameUserIdAsync(gameUser.Id, cancellationToken: cancellationToken);
                    var deckCards = await _gameDeckRepository.GetGameDeckCardCollectionAsync(gameDeck.Id, cancellationToken: cancellationToken);

                    game.GameDeckId = gameDeck.Id;
                    game.GameDeck = _gameDeckMapper.Map(gameDeck);
                    game.GameDeck.CardCollection = deckCards.Select(_gameDeckCardCollectionMapper.Map).ToArray();

                    //TODO: Replace with data layer
                    var cardFilter = new CardSearchFilter
                    {
                        Ids = deckCards.Select(x => x.CardId).ToArray(),
                    };
                    var cards = await _cardService.GetCardsAsync(cardFilter, cancellationToken: cancellationToken);

                    foreach (var cc in game.GameDeck.CardCollection)
                    {
                        cc.Card = cards.Results.SingleOrDefault(x => x.Id == cc.CardId);
                    }
                }
            }

            return game;
        }

        Task<Abstractions.SearchResult<GameModel>> IGameService.GetGamesAsync(Abstractions.GameSearchFilter filter, int? userId, CancellationToken cancellationToken)
        {
            return GetGamesInternalAsync(filter, userId: userId, cancellationToken: cancellationToken);
        }
    }
}
