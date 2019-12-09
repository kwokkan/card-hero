using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class StoreItemService : BaseService, IStoreItemService
    {
        public StoreItemService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
            : base(contextFactory)
        {
        }

        Task<SearchResult<StoreItemModel>> IStoreItemService.GetStoreItemsAsync(StoreItemSearchFilter filter, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var query = context.StoreItem
                .AsQueryable();

            query = query.Where(x => x.Expiry == null || x.Expiry.Value < DateTime.UtcNow);

            return PaginateAndSortAsync(query, filter, x => x.ToCore(), cancellationToken: cancellationToken);
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

            var user = await context.User.FirstOrDefaultAsync(x => x.UserPk == userId, cancellationToken: cancellationToken);

            if (user == null)
            {
                throw new InvalidPlayerException($"Player { userId } does not exist.");
            }

            if (user.Coins < bundle.Cost)
            {
                throw new InvalidPlayerException($"Player { userId } does not have enough coins.");
            }

            user.Coins -= bundle.Cost;

            context.SaveChanges();

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
