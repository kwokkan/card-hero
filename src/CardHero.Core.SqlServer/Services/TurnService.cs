using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class TurnService : BaseService, ITurnService
    {
        public TurnService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
            : base(contextFactory)
        {
        }

        async Task<IEnumerable<TurnModel>> ITurnService.GetTurnsAsync(int gameId, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var result = await context
                .Turn
                .Where(x => x.GameFk == gameId)
                .Select(x => new TurnModel
                {
                    EndTime = x.EndTime,
                    Id = x.TurnPk,
                    StartTime = x.StartTime,
                })
                .ToListAsync(cancellationToken: cancellationToken);

            return result;
        }
    }
}
