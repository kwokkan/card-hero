using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameUserRepository
    {
        Task<GameUserData> AddGameUserAsync(int gameId, int gameDeckId, CancellationToken cancellationtoken = default);
    }
}
