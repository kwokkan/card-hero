using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameRepository
    {
        Task<GameData> AddGameAsync(GameData game, CancellationToken cancellationToken = default);

        Task<MoveData[]> GetMovesByGameIdAsync(int gameId, CancellationToken cancellationToken = default);
    }
}
