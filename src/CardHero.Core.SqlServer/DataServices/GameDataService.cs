using System;
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
        private readonly IDataMapper<GameUserData, GameUserModel> _gameUserMapper;

        public GameDataService(
            IGameRepository gameRepository,
            IDataMapper<GameData, GameModel> gameMapper,
            IDataMapper<GameUserData, GameUserModel> gameUserMapper
        )
        {
            _gameRepository = gameRepository;

            _gameMapper = gameMapper;
            _gameUserMapper = gameUserMapper;
        }

        private async Task PopulateGameUsersInternalAsync(GameModel game, int userId, CancellationToken cancellationToken = default)
        {
            var users = await _gameRepository.GetGameUsersAsync(game.Id, cancellationToken: cancellationToken);
            var userIds = users.Select(x => x.UserId).ToArray();
            game.CanJoin = !game.EndTime.HasValue && userIds.Length < game.MaxUsers && !userIds.Contains(userId);
            game.CanPlay = !game.EndTime.HasValue && userIds.Contains(userId) && game.CurrentUser?.Id == userId;

            game.Users = users.Select(x => _gameUserMapper.Map(x)).ToArray();
        }

        async Task<Abstractions.SearchResult<GameModel>> IGameDataService.GetGamesAsync(Abstractions.GameSearchFilter filter, int? userId, CancellationToken cancellationToken)
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

        Task IGameDataService.PopulateGameUsersAsync(GameModel game, int userId, CancellationToken cancellationToken)
        {
            return PopulateGameUsersInternalAsync(game, userId, cancellationToken);
        }
    }
}
