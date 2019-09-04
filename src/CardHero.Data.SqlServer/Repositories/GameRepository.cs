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
        private readonly ICardHeroDataDbContextFactory _factory;

        public GameRepository(ICardHeroDataDbContextFactory factory)
        {
            _factory = factory;
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
