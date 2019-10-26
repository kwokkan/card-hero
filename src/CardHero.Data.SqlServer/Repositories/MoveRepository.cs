using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    public class MoveRepository : IMoveRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        public MoveRepository(ICardHeroDataDbContextFactory factory)
        {
            _factory = factory;
        }

        async Task<MoveData> IMoveRepository.AddMoveAsync(MoveData move, CancellationToken cancellationToken)
        {
            var newMove = new Move
            {
                GameDeckCardCollectionFk = move.GameDeckCardCollectionId,
                Column = move.Column,
                CreatedTime = DateTime.UtcNow,
                Row = move.Row,
                TurnFk = move.TurnId,
            };

            using (var context = _factory.Create(trackChanges: true))
            {
                context.Move.Add(newMove);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);
            }

            return move;
        }

        async Task<ReadOnlyCollection<MoveData>> IMoveRepository.GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var result = await context
                    .Move
                    .Include(x => x.GameDeckCardCollectionFkNavigation)
                    .Include(x => x.TurnFkNavigation)
                    .Where(x => x.TurnFkNavigation.GameFk == gameId)
                    .Select(x => new MoveData
                    {
                        CardId = x.GameDeckCardCollectionFkNavigation.CardFk,
                        GameDeckCardCollectionId = x.GameDeckCardCollectionFk,
                        Column = x.Column,
                        GameId = x.TurnFkNavigation.GameFk,
                        Row = x.Row,
                        GameUserId = x.TurnFkNavigation.CurrentGameUserFk,
                    })
                    .ToArrayAsync(cancellationToken: cancellationToken);

                return Array.AsReadOnly(result);
            }
        }
    }
}
