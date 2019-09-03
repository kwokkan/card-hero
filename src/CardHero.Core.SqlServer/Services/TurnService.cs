using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardHero.Core.Abstractions;
using CardHero.Core.SqlServer.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Options;

namespace CardHero.Core.SqlServer.Services
{
    public class TurnService : BaseService, ITurnService
    {
        public TurnService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
            : base(contextFactory)
        {
        }

        public async Task<IEnumerable<Core.Models.Turn>> GetTurnsAsync(int gameId)
        {
            var context = GetContext();

            var result = await context
                .Turn
                .Where(x => x.GameFk == gameId)
                .Select(x => new Core.Models.Turn
                {
                    EndTime = x.EndTime,
                    Id = x.TurnPk,
                    StartTime = x.StartTime,
                })
                .ToListAsync();

            return result;
        }
    }
}
