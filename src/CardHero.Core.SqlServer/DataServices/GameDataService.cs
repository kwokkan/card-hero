using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.DataServices
{
    internal class GameDataService : IGameDataService
    {
        private readonly IGameRepository _gameRepository;

        private readonly IDataMapper<GameData, GameModel> _gameMapper;

        public GameDataService(
            IGameRepository gameRepository,
            IDataMapper<GameData, GameModel> gameMapper
        )
        {
            _gameRepository = gameRepository;

            _gameMapper = gameMapper;
        }

        private async Task PopulateGameUsersInternalAsync(GameModel game, CancellationToken cancellationToken = default)
        {
            var users = await _gameRepository.GetGameUsersAsync(game.Id, cancellationToken: cancellationToken);
            var userIds = users.Select(x => x.Id).ToArray();

            game.UserIds = userIds;
        }

        async Task<Abstractions.SearchResult<GameModel>> IGameDataService.GetGamesAsync(Abstractions.GameSearchFilter filter, int? userId, CancellationToken cancellationToken)
        {
            var result = await _gameRepository.FindGamesAsync(
                new Data.Abstractions.GameSearchFilter
                {
                    GameId = filter.GameId,
                    Type = filter.Type,
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
                foreach (var game in results.Results)
                {
                    //TODO: Fix loop to no make multiple calls
                    await PopulateGameUsersInternalAsync(game, cancellationToken: cancellationToken);
                }
            }

            return results;
        }

        Task IGameDataService.PopulateGameUsersAsync(GameModel game, CancellationToken cancellationToken)
        {
            return PopulateGameUsersInternalAsync(game, cancellationToken);
        }
    }
}
