using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.PostgreSql
{
    internal class GameRepository : IGameRepository
    {
        private const int DefaultPageSize = 30;

        private readonly CardHeroDataDbContext _context;
        private readonly IMapper<Game, GameData> _gameMapper;
        private readonly IMapper<User, UserData> _userMapper;

        public GameRepository(
            CardHeroDataDbContext context,
            IMapper<Game, GameData> gameMapper,
            IMapper<User, UserData> userMapper
        )
        {
            _context = context;

            _gameMapper = gameMapper;
            _userMapper = userMapper;
        }

        private async Task<SearchResult<GameData>> FindGamesInternalAsync(GameSearchFilter filter, CancellationToken cancellationToken)
        {
            var query = _context.Game.AsQueryable();

            if (filter.GameId.HasValue)
            {
                query = query.Where(x => x.GamePk == filter.GameId.Value);
            }

            if (filter.Type.HasValue)
            {
                query = query.Where(x => x.GameTypeFk == (int)filter.Type.Value);
            }

            var totalCount = await query.CountAsync(cancellationToken: cancellationToken);

            query = query.OrderByDescending(x => x.GamePk);

            query = query.Skip(0).Take(DefaultPageSize);

            var results = query.Select(_gameMapper.Map).ToArray();

            var result = new SearchResult<GameData>
            {
                CurrentPage = 0,
                PageSize = DefaultPageSize,
                Results = results,
                TotalCount = totalCount,
            };

            return result;
        }

        private async Task<GameData> GetGameByIdInternalAsync(int id, CancellationToken cancellationToken)
        {
            var filter = new GameSearchFilter
            {
                GameId = id,
            };
            var games = await FindGamesInternalAsync(filter, cancellationToken);

            return games.Results.FirstOrDefault();
        }

        async Task<GameData> IGameRepository.AddGameAsync(GameCreateData game, CancellationToken cancellationToken)
        {
            var data = new Game
            {
                Columns = game.Columns,
                GameTypeFk = (int)game.Type,
                MaxPlayers = game.MaxPlayers,
                Rows = game.Rows,
                StartTime = DateTime.UtcNow,
            };

            _context.Game.Add(data);

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            return await GetGameByIdInternalAsync(data.GamePk, cancellationToken: cancellationToken);
        }

        Task<SearchResult<GameData>> IGameRepository.FindGamesAsync(GameSearchFilter filter, CancellationToken cancellationToken)
        {
            return FindGamesInternalAsync(filter, cancellationToken);
        }

        Task<GameData> IGameRepository.GetGameByIdAsync(int id, CancellationToken cancellationToken)
        {
            return GetGameByIdInternalAsync(id, cancellationToken);
        }

        async Task<UserData[]> IGameRepository.GetGameUsersAsync(int gameId, CancellationToken cancellationToken)
        {
            var result = await _context
                .GameUser
                .Include(x => x.UserFkNavigation)
                .Where(x => x.GameFk == gameId)
                .OrderBy(x => x.Order)
                .Select(x => _userMapper.Map(x.UserFkNavigation))
                .ToArrayAsync(cancellationToken: cancellationToken);

            return result;
        }

        async Task<GameData> IGameRepository.UpdateGameAsync(int id, GameUpdateData update, CancellationToken cancellationToken)
        {
            var existingGame = await _context.Game.SingleOrDefaultAsync(x => x.GamePk == id, cancellationToken: cancellationToken);

            if (existingGame == null)
            {
                throw new CardHeroDataException($"Game { id } does not exist.");
            }

            if (update.CurrentUserId.IsSet)
            {
                existingGame.CurrentUserFk = update.CurrentUserId.Value;
            }

            if (update.EndTime.IsSet)
            {
                existingGame.EndTime = update.EndTime.Value;
            }

            if (update.WinnerUserId.IsSet)
            {
                existingGame.WinnerUserFk = update.WinnerUserId.Value;
            }

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            return await GetGameByIdInternalAsync(id, cancellationToken: cancellationToken);
        }

        async Task IGameRepository.UpdateGameUsersOrderAsync(int id, IEnumerable<int> userIds, CancellationToken cancellationToken)
        {
            if (userIds == null || !userIds.Any())
            {
                return;
            }

            var existingGame = await _context
                .Game
                .Include(x => x.GameUser)
                .SingleOrDefaultAsync(x => x.GamePk == id, cancellationToken: cancellationToken);

            if (existingGame == null)
            {
                throw new CardHeroDataException($"Game { id } does not exist.");
            }

            var counter = 1;
            var gameUsers = existingGame.GameUser.ToArray();

            foreach (var userId in userIds)
            {
                var gu = gameUsers.FirstOrDefault(x => x.UserFk == userId);

                if (gu != null)
                {
                    gu.Order = counter++;
                }
            }

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);
        }
    }
}
