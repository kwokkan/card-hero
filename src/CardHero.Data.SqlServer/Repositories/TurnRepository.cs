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

        private async Task<int> GetGameUserIdAsync(int gameId, int userId, CancellationToken cancellationToken = default)
        {
            var gameUser = await _context
                .GameUser
                .SingleAsync(x => x.GameFk == gameId && x.UserFk == userId, cancellationToken: cancellationToken)
            ;

            return gameUser.GameUserPk;
        }

        async Task<TurnData> ITurnRepository.AddTurnAsync(TurnData turn, CancellationToken cancellationToken)
        {
            var gameUserId = await GetGameUserIdAsync(turn.GameId, turn.CurrentUserId, cancellationToken: cancellationToken);

            var newTurn = new Turn
            {
                CurrentGameUserFk = gameUserId,
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
