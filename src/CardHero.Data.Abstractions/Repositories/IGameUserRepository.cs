using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameUserRepository
    {
        Task<GameUserData> AddGameUserAsync(int gameId, int userId, CancellationToken cancellationToken = default);
    }
}
