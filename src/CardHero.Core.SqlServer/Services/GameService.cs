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
        private readonly IDataMapper<GameData, GameModel> _gameMapper;
        private readonly IDataMapper<GameUserData, GameUserModel> _gameUserMapper;

        public GameService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            IGameValidator gameValidator,
            IDeckRepository deckRepository,
            IGameDeckRepository gameDeckRepository,
            IGameRepository gameRepository,
            IGameUserRepository gameUserRepository,
            IDataMapper<GameData, GameModel> gameMapper,
            IDataMapper<GameUserData, GameUserModel> gameUserMapper
        )
            : base(contextFactory)
        {
            _gameValidator = gameValidator;
            _deckRepository = deckRepository;
            _gameDeckRepository = gameDeckRepository;
            _gameRepository = gameRepository;
            _gameUserRepository = gameUserRepository;
            _gameMapper = gameMapper;
            _gameUserMapper = gameUserMapper;
        }

        public async Task<GameUserModel> AddUserToGameAsync(int id, int userId, int deckId, CancellationToken cancellationToken = default)
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

            return _gameUserMapper.Map(newGameUser);
        }

        public async Task<GameModel> CreateGameAsync(GameModel game, CancellationToken cancellationToken = default)
        {
            await _gameValidator.ValidateGameAsync(game);

            var newGame = _gameMapper.Map(game);

            newGame = await _gameRepository.AddGameAsync(newGame, cancellationToken: cancellationToken);

            game.Id = newGame.Id;

            if (game.Users != null)
            {
                foreach (var user in game.Users)
                {
                    await AddUserToGameAsync(game.Id, user.Id, game.DeckId);
                }
            }

            return game;
        }

        public Task<Abstractions.SearchResult<GameModel>> GetGamesAsync(Abstractions.GameSearchFilter filter)
        {
            var result = new Abstractions.SearchResult<GameModel>();

            var context = GetContext();

            var query = context.Game
                .Include(x => x.CurrentUserFkNavigation)
                .Include(x => x.DeckFkNavigation)
                    .ThenInclude(x => x.DeckCardCollection)
                        .ThenInclude(x => x.CardCollectionFkNavigation)
                            .ThenInclude(x => x.CardFkNavigation)
                .Include(x => x.GameUser)
                    .ThenInclude(x => x.GameFkNavigation)
                .Include(x => x.GameUser)
                    .ThenInclude(x => x.UserFkNavigation)
                .Include(x => x.WinnerFkNavigation)
                .AsQueryable();

            if (filter.GameId.HasValue)
            {
                query = query.Where(x => x.GamePk == filter.GameId.Value);
            }

            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                query = query.Where(x => x.Name.Contains(filter.Name));
            }

            if (filter.StartTime.HasValue)
            {
                query = query.Where(x => x.StartTime >= filter.StartTime.Value);
            }

            if (filter.EndTime.HasValue)
            {
                query = query.Where(x => x.EndTime <= filter.EndTime.Value);
            }

            if (filter.ActiveOnly)
            {
                query = query.Where(x => !x.EndTime.HasValue);
            }

            if (filter.Type.HasValue)
            {
                query = query.Where(x => x.GameTypeFk == (int)filter.Type.Value);
            }

            return PaginateAndSortAsync(query, filter, x => x.ToCore());
        }

        public async Task<Abstractions.SearchResult<GameModel>> NewGetGamesAsync(Abstractions.GameSearchFilter filter, CancellationToken cancellationToken = default)
        {
            var result = await _gameRepository.FindGamesAsync(
                new Data.Abstractions.GameSearchFilter
                {
                    Type = (Data.Abstractions.GameType?)(int?)filter.Type,
                },
                cancellationToken: cancellationToken
            );

            var results = new Abstractions.SearchResult<GameModel>
            {
                Count = result.TotalCount,
                Results = result.Results.Select(_gameMapper.Map).ToList(),
            };

            return results;
        }
    }
}
