using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    public class GameRepository : IGameRepository
    {
        private const int DefaultPageSize = 30;

        private readonly ICardHeroDataDbContextFactory _factory;
        private readonly IMapper<Game, GameData> _mapper;

        public GameRepository(
            ICardHeroDataDbContextFactory factory,
            IMapper<Game, GameData> mapper
        )
        {
            _factory = factory;
            _mapper = mapper;
        }

        public async Task<GameData> AddGameAsync(GameData game, CancellationToken cancellationToken = default)
        {
            using (var context = _factory.Create(trackChanges: true))
            {
                var data = new Game
                {
                    Columns = game.Columns,
                    CurrentGameUserFk = game.CurrentGameUserId,
                    GameTypeFk = (int)game.Type,
                    Name = game.Name,
                    Rows = game.Rows,
                    StartTime = game.StartTime,
                };

                context.Game.Add(data);

                await context.SaveChangesAsync();

                game.Id = data.GamePk;

                return game;
            }
        }

        public async Task<SearchResult<GameData>> FindGamesAsync(GameSearchFilter filter, CancellationToken cancellationToken = default)
        {
            using (var context = _factory.Create())
            {
                var query = context.Game.AsQueryable();

                if (filter.Type.HasValue)
                {
                    query = query.Where(x => x.GameTypeFk == (int)filter.Type);
                }

                var totalCount = await query.CountAsync();

                query = query.OrderByDescending(x => x.GamePk);

                query = query.Skip(0).Take(DefaultPageSize);

                var results = query.Select(_mapper.Map).ToArray();

                var result = new SearchResult<GameData>
                {
                    CurrentPage = 0,
                    PageSize = DefaultPageSize,
                    Results = results,
                    TotalCount = totalCount,
                };

                return result;
            }
        }

        public async Task<MoveData[]> GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken = default)
        {
            using (var context = _factory.Create())
            {
                var result = await context
                    .Move
                    .Include(x => x.TurnFkNavigation)
                    .Where(x => x.TurnFkNavigation.GameFk == gameId)
                    .Select(x => new MoveData
                    {
                        CardCollectionId = x.CardCollectionFk,
                        Column = x.Column,
                        GameId = x.TurnFkNavigation.GameFk,
                        Row = x.Row,
                        UserId = x.TurnFkNavigation.CurrentUserFk,
                    })
                    .ToArrayAsync();

                return result;
            }
        }
    }
}
