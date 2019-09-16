using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameDeckRepository
    {
        Task<GameDeckData> AddGameDeckAsync(
            int gameUserId,
            string name,
            string description,
            int[] cardIds,
            CancellationToken cancellationToken = default
        );

        Task<GameDeckCardCollectionData[]> GetGameDeckCardCollectionAsync(int gameDeckId, CancellationToken cancellationToken = default);
    }
}
