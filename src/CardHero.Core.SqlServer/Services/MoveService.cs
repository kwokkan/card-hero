using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class MoveService : BaseService, IMoveService
    {
        public MoveService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
            : base(contextFactory)
        {
        }

        async Task<IEnumerable<Core.Models.MoveModel>> IMoveService.GetMovesAsync(int gameId, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var result = await context
                .Move
                .Include(x => x.TurnFkNavigation)
                .Where(x => x.TurnFkNavigation.GameFk == gameId)
                .Select(x => new Core.Models.MoveModel
                {
                    CardCollectionId = x.CardCollectionFk,
                    Column = x.Column,
                    GameId = x.TurnFkNavigation.GameFk,
                    Row = x.Row,
                    UserId = x.TurnFkNavigation.CurrentUserFk,
                })
                .ToListAsync(cancellationToken: cancellationToken);

            return result;
        }
    }
}
