using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.PostgreSql
{
    internal class MoveRepository : IMoveRepository
    {
        private readonly CardHeroDataDbContext _context;

        public MoveRepository(CardHeroDataDbContext context)
        {
            _context = context;
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

            _context.Move.Add(newMove);

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            return move;
        }

        async Task<ReadOnlyCollection<MoveData>> IMoveRepository.GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken)
        {
            var result = await _context
                .Move
                .Include(x => x.GameDeckCardCollectionFkNavigation)
                .Include(x => x.TurnFkNavigation)
                .Where(x => x.TurnFkNavigation.GameFk == gameId)
                .OrderByDescending(x => x.MovePk)
                .Select(x => new MoveData
                {
                    CardId = x.GameDeckCardCollectionFkNavigation.CardFk,
                    Column = x.Column,
                    GameDeckCardCollectionId = x.GameDeckCardCollectionFk,
                    GameId = x.TurnFkNavigation.GameFk,
                    GameUserId = x.TurnFkNavigation.CurrentGameUserFk,
                    Row = x.Row,
                    StartTime = x.TurnFkNavigation.StartTime,
                })
                .ToArrayAsync(cancellationToken: cancellationToken);

            return Array.AsReadOnly(result);
        }
    }
}
