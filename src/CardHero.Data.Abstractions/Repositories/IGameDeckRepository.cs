using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameDeckRepository
    {
        Task<GameDeckData> AddGameDeckAsync(
            int gameId,
            int userId,
            string name,
            string description,
            int[] cardIds,
            CancellationToken cancellationToken = default
        );

        Task<GameDeckData> GetGameDeckByGameAndUserIdAsync(int gameId, int userId, CancellationToken cancellationToken = default);

        Task<GameDeckCardCollectionData[]> GetGameDeckCardCollectionAsync(int gameDeckId, CancellationToken cancellationToken = default);
    }
}
