using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.DataServices;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Services
{
    public class GameService : BaseService, IGameService
    {
        private readonly IGameValidator _gameValidator;

        private readonly IDeckRepository _deckRepository;
        private readonly IGameDeckRepository _gameDeckRepository;
        private readonly IGameRepository _gameRepository;
        private readonly ITurnRepository _turnRepository;

        private readonly IDataMapper<GameData, GameModel> _gameMapper;
        private readonly IDataMapper<GameCreateData, GameCreateModel> _gameCreateMapper;
        private readonly IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel> _gameDeckCardCollectionMapper;
        private readonly IDataMapper<GameDeckData, GameDeckModel> _gameDeckMapper;

        private readonly ICardService _cardService;
        private readonly IGameDataService _gameDataService;

        public GameService(
            IGameValidator gameValidator,
            IDeckRepository deckRepository,
            IGameDeckRepository gameDeckRepository,
            IGameRepository gameRepository,
            ITurnRepository turnRepository,
            IDataMapper<GameData, GameModel> gameMapper,
            IDataMapper<GameCreateData, GameCreateModel> gameCreateMapper,
            IDataMapper<GameDeckCardCollectionData, GameDeckCardCollectionModel> gameDeckCardCollectionMapper,
            IDataMapper<GameDeckData, GameDeckModel> gameDeckMapper,
            ICardService cardService,
            IGameDataService gameDataService
        )
        {
            _gameValidator = gameValidator;

            _deckRepository = deckRepository;
            _gameDeckRepository = gameDeckRepository;
            _gameRepository = gameRepository;
            _turnRepository = turnRepository;

            _gameMapper = gameMapper;
            _gameCreateMapper = gameCreateMapper;
            _gameDeckCardCollectionMapper = gameDeckCardCollectionMapper;
            _gameDeckMapper = gameDeckMapper;

            _cardService = cardService;
            _gameDataService = gameDataService;
        }

        private async Task AddUserToGameInternalAsync(int id, int userId, int deckId, CancellationToken cancellationToken = default)
        {
            var game = await _gameRepository.GetGameByIdAsync(id);

            if (game == null)
            {
                throw new InvalidGameException($"Game { id } does not exist.");
            }

            var gameUsers = await _gameRepository.GetGameUsersAsync(id, cancellationToken: cancellationToken);

            if (gameUsers.Any(x => x.Id == userId))
            {
                throw new InvalidPlayerException($"User { userId } is already in game { id }.");
            }

            var gul = gameUsers.Length;
            if (gul >= game.MaxPlayers)
            {
                throw new InvalidPlayerException($"Game { id } is already filled.");
            }

            var deck = await _deckRepository.GetDeckByIdAsync(deckId, userId, cancellationToken: cancellationToken);

            if (deck == null)
            {
                throw new InvalidDeckException($"Deck { deckId } does not exist.");
            }

            if (deck.UserId != userId)
            {
                throw new InvalidDeckException($"Deck { deckId } does not belong to user { userId }.");
            }

            var dc = deck.Cards.Select(x => x.CardId).ToArray();
            var dcc = dc.Length;
            if (dcc < deck.MaxCards)
            {
                throw new InvalidDeckException($"Deck { deckId } needs { deck.MaxCards } cards. Currently only has { dcc }.");
            }

            await _gameDeckRepository.AddGameDeckAsync(id, userId, deck.Name, deck.Description, dc, cancellationToken: cancellationToken);

            if (gul + 1 == game.MaxPlayers)
            {
                var allUsers = gameUsers.Select(x => x.Id).Concat(new int[] { userId }).ToArray();
                var currentUserIdx = new Random().Next(0, allUsers.Length);
                var currentUserId = allUsers[currentUserIdx];
                var updateGame = new GameUpdateData
                {
                    CurrentUserId = currentUserId,
                };

                await _gameRepository.UpdateGameAsync(id, updateGame, cancellationToken: cancellationToken);

                var newTurn = new TurnData
                {
                    CurrentUserId = currentUserId,
                    GameId = game.Id,
                };
                await _turnRepository.AddTurnAsync(newTurn, cancellationToken: cancellationToken);
            }
        }

        Task IGameService.AddUserToGameAsync(int id, GameJoinModel join, CancellationToken cancellationToken)
        {
            return AddUserToGameInternalAsync(id, join.UserId, join.DeckId, cancellationToken: cancellationToken);
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
            var game = (await _gameDataService.GetGamesAsync(filter, userId: userId, cancellationToken: cancellationToken)).Results.SingleOrDefault();

            if (game == null)
            {
                throw new InvalidGameException($"Game { id } does not exist.");
            }

            if (userId.HasValue)
            {
                await _gameDataService.PopulateGameUsersAsync(game, userId.Value, cancellationToken: cancellationToken);
                var user = game.Users.SingleOrDefault(x => x.Id == userId.Value);

                if (user != null)
                {
                    var gameDeck = await _gameDeckRepository.GetGameDeckByGameAndUserIdAsync(id, user.Id, cancellationToken: cancellationToken);
                    var deckCards = await _gameDeckRepository.GetGameDeckCardCollectionAsync(gameDeck.Id, cancellationToken: cancellationToken);

                    game.GameDeckId = gameDeck.Id;
                    game.GameDeck = _gameDeckMapper.Map(gameDeck);
                    game.GameDeck.CardCollection = deckCards.Select(_gameDeckCardCollectionMapper.Map).ToArray();

                    //TODO: Replace with data layer
                    var cardFilter = new Abstractions.CardSearchFilter
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
            return _gameDataService.GetGamesAsync(filter, userId: userId, cancellationToken: cancellationToken);
        }
    }
}
