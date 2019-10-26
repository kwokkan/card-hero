using System.Collections.ObjectModel;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface ITurnRepository
    {
        Task<TurnData> AddTurnAsync(TurnData turn, CancellationToken cancellationToken = default);

        Task<ReadOnlyCollection<TurnData>> GetTurnsByGameIdAsync(int gameId, CancellationToken cancellationToken = default);

        Task UpdateTurnAsync(int id, TurnUpdateData update, CancellationToken cancellationToken = default);
    }
}
