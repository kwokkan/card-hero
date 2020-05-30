﻿using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class StoreItemRepository : IStoreItemRepository
    {
        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<StoreItem, StoreItemData> _storeItemMapper;

        public StoreItemRepository(
            CardHeroDataDbContext context,
            IMapper<StoreItem, StoreItemData> storeItemMapper
        )
        {
            _context = context;

            _storeItemMapper = storeItemMapper;
        }

        Task<ReadOnlyCollection<StoreItemData>> IStoreItemRepository.FindStoreItemsAsync(CancellationToken cancellationToken)
        {
            var result = _context
                .StoreItem
                .Where(x => x.Expiry == null || x.Expiry.Value > DateTime.UtcNow)
                .Select(_storeItemMapper.Map)
                .ToArray()
            ;

            return Task.FromResult(Array.AsReadOnly(result));
        }

        Task<StoreItemData> IStoreItemRepository.GetStoreItemById(int id, CancellationToken cancellationToken)
        {
            var user = _context
                .StoreItem
                .Where(x => x.StoreItemPk == id)
                .Select(_storeItemMapper.Map)
                .FirstOrDefault();

            return Task.FromResult(user);
        }
    }
}
