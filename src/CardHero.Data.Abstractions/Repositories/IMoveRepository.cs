using System.Collections.ObjectModel;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IMoveRepository
    {
        Task<MoveData> AddMoveAsync(MoveData move, CancellationToken cancellationToken = default);

        Task<ReadOnlyCollection<MoveData>> GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken = default);
    }
}
