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
    internal class TurnRepository : ITurnRepository
    {
        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<Turn, TurnData> _turnMapper;

        public TurnRepository(
            CardHeroDataDbContext context,
            IMapper<Turn, TurnData> turnMapper
        )
        {
            _context = context;

            _turnMapper = turnMapper;
        }

        async Task<TurnData> ITurnRepository.AddTurnAsync(TurnData turn, CancellationToken cancellationToken)
        {
            var newTurn = new Turn
            {
                CurrentGameUserFk = turn.CurrentGameUserId,
                GameFk = turn.GameId,
                StartTime = DateTime.UtcNow,
            };

            _context.Turn.Add(newTurn);
            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            turn.Id = newTurn.TurnPk;
            turn.StartTime = newTurn.StartTime;

            return turn;
        }

        Task<ReadOnlyCollection<TurnData>> ITurnRepository.GetTurnsByGameIdAsync(int gameId, CancellationToken cancellationToken)
        {
            var data = _context
                .Turn
                .Where(x => x.GameFk == gameId)
                .Select(_turnMapper.Map)
                .ToArray();

            return Task.FromResult(Array.AsReadOnly(data));
        }

        async Task ITurnRepository.UpdateTurnAsync(int id, TurnUpdateData update, CancellationToken cancellationToken)
        {
            var existingTurn = await _context.Turn.SingleOrDefaultAsync(x => x.TurnPk == id, cancellationToken: cancellationToken);

            if (existingTurn == null)
            {
                throw new CardHeroDataException($"Turn { id } does not exist.");
            }

            if (update.EndTime.IsSet)
            {
                existingTurn.EndTime = update.EndTime.Value;
            }

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);
        }
    }
}
