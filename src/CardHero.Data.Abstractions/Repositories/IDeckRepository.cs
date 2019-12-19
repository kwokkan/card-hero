using System.Collections.ObjectModel;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IDeckRepository
    {
        Task<ReadOnlyCollection<DeckData>> FindDecksAsync(DeckSearchFilter filter, CancellationToken cancellationToken = default);

        Task<DeckData> GetDeckByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
