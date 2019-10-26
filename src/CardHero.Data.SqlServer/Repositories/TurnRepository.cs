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
    public class TurnRepository : ITurnRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        private readonly IMapper<Turn, TurnData> _turnMapper;

        public TurnRepository(
            ICardHeroDataDbContextFactory factory,
            IMapper<Turn, TurnData> turnMapper
        )
        {
            _factory = factory;

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

            using (var context = _factory.Create(trackChanges: true))
            {
                context.Turn.Add(newTurn);
                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                turn.Id = newTurn.TurnPk;
                turn.StartTime = newTurn.StartTime;
            }

            return turn;
        }

        Task<ReadOnlyCollection<TurnData>> ITurnRepository.GetTurnsByGameIdAsync(int gameId, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var data = context
                    .Turn
                    .Where(x => x.GameFk == gameId)
                    .Select(_turnMapper.Map)
                    .ToArray();

                return Task.FromResult(Array.AsReadOnly(data));
            }
        }

        async Task ITurnRepository.UpdateTurnAsync(int id, TurnUpdateData update, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create(trackChanges: true))
            {
                var existingTurn = await context.Turn.SingleOrDefaultAsync(x => x.TurnPk == id, cancellationToken: cancellationToken);

                if (existingTurn == null)
                {
                    throw new CardHeroDataException($"Turn { id } does not exist.");
                }

                if (update.EndTime.IsSet)
                {
                    existingTurn.EndTime = update.EndTime.Value;
                }

                await context.SaveChangesAsync(cancellationToken: cancellationToken);
            }
        }
    }
}
