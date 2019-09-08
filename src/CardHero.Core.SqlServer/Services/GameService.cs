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
        private readonly IDataMapper<GameData, Models.Game> _gameMapper;
        private readonly IDataMapper<GameUserData, GameUserModel> _gameUserMapper;

        public GameService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            IGameValidator gameValidator,
            IDeckRepository deckRepository,
            IGameDeckRepository gameDeckRepository,
            IGameRepository gameRepository,
            IGameUserRepository gameUserRepository,
            IDataMapper<GameData, Models.Game> gameMapper,
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

            var newGameDeck = await _gameDeckRepository.AddGameDeckAsync(id, deckId, cancellationToken: cancellationToken);

            var newGameUser = await _gameUserRepository.AddGameUserAsync(id, newGameDeck.Id, cancellationtoken: cancellationToken);

            return _gameUserMapper.Map(newGameUser);
        }

        public async Task<Core.Models.Game> CreateGameAsync(Core.Models.Game game)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(game));
            }

            if (game.Users == null || !game.Users.Any())
            {
                throw new ArgumentException("There must be at least 1 user.");
            }

            if (game.DeckId <= 0)
            {
                throw new ArgumentException("There must be a deck to play.");
            }

            var context = GetContext();

            var deck = await context.Deck.FirstOrDefaultAsync(x => x.DeckPk == game.DeckId);

            //TODO: Do actual validation on the deck to make sure it belongs to the user
            //var myUserId = 0;
            //if (deck == null || deck.UserFk != myUserId)
            //    throw new InvalidDeckException("The selected deck is invalid.");

            var users = game.Users.ToList();
            var currentUserId = new Random().Next(0, users.Count());
            var newGame = new EntityFramework.Game
            {
                CurrentUserFk = users[currentUserId].Id,
                DeckFk = game.DeckId,
                GameUser = users.Select(x => new GameUser
                {
                    UserFk = x.Id,
                }).ToList(),
                GameTypeFk = (int)game.Type,
                Name = game.Name,
            };

            newGame.Turn.Add(new EntityFramework.Turn
            {
                CurrentUserFk = users[currentUserId].Id,
                StartTime = DateTime.UtcNow,
            });

            context.Add(newGame);
            await context.SaveChangesAsync();

            var filter = new Abstractions.GameSearchFilter
            {
                GameId = newGame.GamePk,
            };
            var result = (await GetGamesAsync(filter)).Results.FirstOrDefault();

            return result;
        }

        public async Task<Models.Game> NewCreateGameAsync(Models.Game game, CancellationToken cancellationToken = default)
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

        public Task<Abstractions.SearchResult<Core.Models.Game>> GetGamesAsync(Abstractions.GameSearchFilter filter)
        {
            var result = new Abstractions.SearchResult<Core.Models.Game>();

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

        public async Task<Abstractions.SearchResult<Models.Game>> NewGetGamesAsync(Abstractions.GameSearchFilter filter, CancellationToken cancellationToken = default)
        {
            var result = await _gameRepository.FindGamesAsync(
                new Data.Abstractions.GameSearchFilter
                {
                    Type = (Data.Abstractions.GameType?)(int?)filter.Type,
                },
                cancellationToken: cancellationToken
            );

            var results = new Abstractions.SearchResult<Models.Game>
            {
                Count = result.TotalCount,
                Results = result.Results.Select(_gameMapper.Map).ToList(),
            };

            return results;
        }
    }
}
