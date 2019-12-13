using System.Collections.ObjectModel;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IStoreItemRepository
    {
        Task<ReadOnlyCollection<StoreItemData>> FindStoreItemsAsync(CancellationToken cancellationToken = default);

        Task<StoreItemData> GetStoreItemById(int id, CancellationToken cancellationToken = default);
    }
}
