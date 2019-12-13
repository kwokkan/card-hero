using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    public class StoreItemRepository : IStoreItemRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        public StoreItemRepository(ICardHeroDataDbContextFactory factory)
        {
            _factory = factory;
        }

        async Task<ReadOnlyCollection<StoreItemData>> IStoreItemRepository.FindStoreItemsAsync(CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var result = await context
                    .StoreItem
                    .Where(x => x.Expiry == null || x.Expiry.Value < DateTime.UtcNow)
                    .Select(x => new StoreItemData
                    {
                        Cost = x.Cost,
                        Description = x.Description,
                        Expiry = x.Expiry,
                        Id = x.StoreItemPk,
                        ItemCount = x.ItemCount,
                        Name = x.Name,
                    })
                    .ToArrayAsync(cancellationToken: cancellationToken)
                ;

                return Array.AsReadOnly(result);
            }
        }
    }
}
