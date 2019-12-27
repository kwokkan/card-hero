using System.Collections.ObjectModel;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IDeckRepository
    {
        Task<DeckData> CreateDeckAsync(DeckCreateData deck, CancellationToken cancellationToken = default);

        Task FavouriteDeckAsync(int id, int userId, bool favourite, CancellationToken cancellationToken = default);

        Task<ReadOnlyCollection<DeckData>> FindDecksAsync(DeckSearchFilter filter, CancellationToken cancellationToken = default);

        Task<DeckData> GetDeckByIdAsync(int id, int userId, CancellationToken cancellationToken = default);

        Task<DeckData> UpdateDeckAsync(int id, DeckUpdateData update, CancellationToken cancellationToken = default);
    }
}
