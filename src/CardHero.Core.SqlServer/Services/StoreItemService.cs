﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;
using CardHero.Data.Abstractions;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class StoreItemService : BaseService, IStoreItemService
    {
        private readonly IStoreItemRepository _storeItemRepository;
        private readonly IUserRepository _userRepository;

        private readonly IDataMapper<StoreItemData, StoreItemModel> _storeItemDataMapper;

        public StoreItemService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            IStoreItemRepository storeItemRepository,
            IUserRepository userRepository,
            IDataMapper<StoreItemData, StoreItemModel> storeItemDataMapper
        )
            : base(contextFactory)
        {
            _storeItemRepository = storeItemRepository;
            _userRepository = userRepository;

            _storeItemDataMapper = storeItemDataMapper;
        }

        async Task<Abstractions.SearchResult<StoreItemModel>> IStoreItemService.GetStoreItemsAsync(StoreItemSearchFilter filter, CancellationToken cancellationToken)
        {
            var result = await _storeItemRepository.FindStoreItemsAsync(cancellationToken: cancellationToken);

            var results = new Abstractions.SearchResult<StoreItemModel>
            {
                Count = result.Count,
                Results = result.Select(_storeItemDataMapper.Map).ToArray(),
            };

            return results;
        }

        async Task<IEnumerable<CardModel>> IStoreItemService.BuyStoreItemAsync(StoreItemModel storeItem, int userId, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var bundle = await context.StoreItem.FirstOrDefaultAsync(x => x.StoreItemPk == storeItem.Id, cancellationToken: cancellationToken);

            if (bundle == null)
            {
                throw new InvalidStoreItemException($"Store item { storeItem.Id } not found in store.");
            }

            if (bundle.Expiry.HasValue && bundle.Expiry > DateTime.UtcNow)
            {
                throw new InvalidStoreItemException($"Store item { bundle.Name } has expired.");
            }

            var user = await _userRepository.GetUserByIdAsync(userId, cancellationToken: cancellationToken);

            if (user == null)
            {
                throw new InvalidPlayerException($"Player { userId } does not exist.");
            }

            if (user.Coins < bundle.Cost)
            {
                throw new InvalidPlayerException($"Player { userId } does not have enough coins.");
            }

            var userUpdate = new UserUpdateData
            {
                Coins = user.Coins - bundle.Cost,
            };

            await _userRepository.UpdateUserAsync(userId, userUpdate, cancellationToken: cancellationToken);

            var allCards = (await context
                .Card
                .Include(x => x.RarityFkNavigation)
                .ToListAsync(cancellationToken: cancellationToken))
                .SelectMany(x => Enumerable.Repeat(x, x.RarityFkNavigation.Frequency))
                .ToArray();
            var acl = allCards.Length;

            var ic = bundle.ItemCount;
            var cards = new Card[ic];
            var random = new Random();

            for (int i = 0; i < ic; i++)
            {
                cards[i] = allCards[random.Next(acl)];
            }

            return cards.Select(x => x.ToCore(null));
        }
    }
}
