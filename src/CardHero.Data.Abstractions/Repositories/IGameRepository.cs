using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameRepository
    {
        Task<MoveData[]> GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken = default);
    }
}
