using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    public class StoreItemRepository : IStoreItemRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        private readonly IMapper<StoreItem, StoreItemData> _storeItemMapper;

        public StoreItemRepository(
            ICardHeroDataDbContextFactory factory,
            IMapper<StoreItem, StoreItemData> storeItemMapper
        )
        {
            _factory = factory;

            _storeItemMapper = storeItemMapper;
        }

        Task<ReadOnlyCollection<StoreItemData>> IStoreItemRepository.FindStoreItemsAsync(CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var result = context
                    .StoreItem
                    .Where(x => x.Expiry == null || x.Expiry.Value < DateTime.UtcNow)
                    .Select(_storeItemMapper.Map)
                    .ToArray()
                ;

                return Task.FromResult(Array.AsReadOnly(result));
            }
        }

        Task<StoreItemData> IStoreItemRepository.GetStoreItemById(int id, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var user = context
                    .StoreItem
                    .Where(x => x.StoreItemPk == id)
                    .Select(_storeItemMapper.Map)
                    .FirstOrDefault();

                return Task.FromResult(user);
            }
        }
    }
}
