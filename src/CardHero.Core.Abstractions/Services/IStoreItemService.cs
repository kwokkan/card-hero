using System.Collections.Generic;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods for querying the store.
    /// </summary>
    public interface IStoreItemService
    {
        /// <summary>
        /// Gets a list of store items.
        /// </summary>
        /// <param name="filter">The store item filter to use.</param>
        /// <returns>A list of store items.</returns>
        Task<SearchResult<StoreItemModel>> GetStoreItemsAsync(StoreItemSearchFilter filter);

        /// <summary>
        /// Buy a store item.
        /// </summary>
        /// <param name="storeItem">The store item to buy.</param>
        /// <param name="userId">The user to buy for.</param>
        /// <returns>List of items.</returns>
        Task<IEnumerable<CardModel>> BuyStoreItemAsync(StoreItemModel storeItem, int userId);
    }
}
