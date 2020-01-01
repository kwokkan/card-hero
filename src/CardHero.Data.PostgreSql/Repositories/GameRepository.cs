using System;
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
        private readonly IMapper<GameUser, GameUserData> _gameUserMapper;

        public GameRepository(
            CardHeroDataDbContext context,
            IMapper<Game, GameData> gameMapper,
            IMapper<GameUser, GameUserData> gameUseMapper
        )
        {
            _context = context;

            _gameMapper = gameMapper;
            _gameUserMapper = gameUseMapper;
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
                Name = game.Name,
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

        async Task<GameUserData[]> IGameRepository.GetGameUsersAsync(int gameId, CancellationToken cancellationToken)
        {
            var result = await _context
                .GameUser
                .Where(x => x.GameFk == gameId)
                .Select(x => _gameUserMapper.Map(x))
                .ToArrayAsync(cancellationToken: cancellationToken);

            return result;
        }

        async Task<MoveData[]> IGameRepository.GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken)
        {
            var result = await _context
                .Move
                .Include(x => x.TurnFkNavigation)
                .Where(x => x.TurnFkNavigation.GameFk == gameId)
                .Select(x => new MoveData
                {
                    GameDeckCardCollectionId = x.GameDeckCardCollectionFk,
                    Column = x.Column,
                    GameId = x.TurnFkNavigation.GameFk,
                    Row = x.Row,
                    GameUserId = x.TurnFkNavigation.CurrentGameUserFk,
                })
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

            if (update.CurrentGameUserId.IsSet)
            {
                existingGame.CurrentGameUserFk = update.CurrentGameUserId.Value;
            }

            if (update.WinnerId.IsSet)
            {
                existingGame.WinnerFk = update.WinnerId.Value;
            }

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            return await GetGameByIdInternalAsync(id, cancellationToken: cancellationToken);
        }
    }
}
