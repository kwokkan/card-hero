using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IDeckRepository
    {
        Task<DeckData> GetDeckByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
