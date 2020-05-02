using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.DataServices;
using CardHero.Core.SqlServer.Handlers;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Services
{
    public class GameService : BaseService, IGameService
    {
        private readonly IGameValidator _gameValidator;

        private readonly IGameRepository _gameRepository;

        private readonly IDataMapper<GameData, GameModel> _gameMapper;
        private readonly IDataMapper<GameCreateData, GameCreateModel> _gameCreateMapper;

        private readonly IGameDataService _gameDataService;

        private readonly IAddUserToGameHandler _addUserToGameHandler;

        public GameService(
            IGameValidator gameValidator,
            IGameRepository gameRepository,
            IDataMapper<GameData, GameModel> gameMapper,
            IDataMapper<GameCreateData, GameCreateModel> gameCreateMapper,
            IGameDataService gameDataService,
            IAddUserToGameHandler addUserToGameHandler
        )
        {
            _gameValidator = gameValidator;

            _gameRepository = gameRepository;

            _gameMapper = gameMapper;
            _gameCreateMapper = gameCreateMapper;

            _gameDataService = gameDataService;

            _addUserToGameHandler = addUserToGameHandler;
        }

        private void PrepareGameForCreate(GameCreateModel game)
        {
            //TODO: Fix properly in code and not database defaults
            game.Columns = 3;
            game.Rows = 3;
            game.MaxPlayers = 2;
        }

        Task IGameService.AddUserToGameAsync(int id, GameJoinModel join, CancellationToken cancellationToken)
        {
            return _addUserToGameHandler.HandleAsync(id, join.UserId, join.DeckId, cancellationToken: cancellationToken);
        }

        async Task<GameModel> IGameService.CreateGameAsync(GameCreateModel game, CancellationToken cancellationToken)
        {
            PrepareGameForCreate(game);

            await _gameValidator.ValidateNewGameAsync(game, cancellationToken: cancellationToken);

            var newGameCreate = _gameCreateMapper.Map(game);

            var newGame = await _gameRepository.AddGameAsync(newGameCreate, cancellationToken: cancellationToken);

            if (game.Users != null)
            {
                foreach (var user in game.Users)
                {
                    await _addUserToGameHandler.HandleAsync(newGame.Id, user.Id, game.DeckId, cancellationToken: cancellationToken);
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
                await _gameDataService.PopulateGameUsersAsync(game, cancellationToken: cancellationToken);
            }

            return game;
        }

        Task<Abstractions.SearchResult<GameModel>> IGameService.GetGamesAsync(Abstractions.GameSearchFilter filter, int? userId, CancellationToken cancellationToken)
        {
            return _gameDataService.GetGamesAsync(filter, userId: userId, cancellationToken: cancellationToken);
        }
    }
}
