using System.Collections.ObjectModel;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IMoveRepository
    {
        Task<ReadOnlyCollection<MoveData>> GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken = default);
    }
}
