using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameDeckRepository
    {
        Task<GameDeckData> AddGameDeckAsync(int gameId, int deckId, CancellationToken cancellationToken = default);
    }
}
