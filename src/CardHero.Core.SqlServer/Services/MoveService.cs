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
    public class MoveService : BaseService, IMoveService
    {
        public MoveService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory, IOptions<CardHeroOptions> options)
            : base(contextFactory, options)
        {
        }

        public async Task<IEnumerable<Core.Models.Move>> GetMovesAsync(int gameId)
        {
            var context = GetContext();

            var result = await context
                .Move
                .Include(x => x.TurnFkNavigation)
                .Where(x => x.TurnFkNavigation.GameFk == gameId)
                .Select(x => new Core.Models.Move
                {
                    CardCollectionId = x.CardCollectionFk,
                    Column = x.Column,
                    GameId = x.TurnFkNavigation.GameFk,
                    Row = x.Row,
                    UserId = x.TurnFkNavigation.CurrentUserFk
                })
                .ToListAsync();

            return result;
        }
    }
}
