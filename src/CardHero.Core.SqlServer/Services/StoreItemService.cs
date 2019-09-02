using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Options;

namespace CardHero.Core.SqlServer.Services
{
    public class StoreItemService : BaseService, IStoreItemService
    {
        public StoreItemService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory, IOptions<CardHeroOptions> options)
            : base(contextFactory, options)
        {
        }

        public Task<SearchResult<Models.StoreItem>> GetStoreItemsAsync(StoreItemSearchFilter filter)
        {
            var result = new SearchResult<Models.StoreItem>();

            var context = GetContext();

            var query = context.StoreItem
                .AsQueryable();

            query = query.Where(x => x.Expiry == null || x.Expiry.Value < DateTime.UtcNow);

            return PaginateAndSortAsync(query, filter, x => x.ToCore());
        }

        public Task<IEnumerable<Models.Card>> BuyStoreItemAsync(Models.StoreItem storeItem, int userId)
        {
            var context = GetContext();

            var bundle = context.StoreItem.FirstOrDefault(x => x.StoreItemPk == storeItem.Id);

            if (bundle == null)
            {
                throw new InvalidStoreItemException($"Store item { storeItem.Id } not found in store.");
            }

            if (bundle.Expiry.HasValue && bundle.Expiry > DateTime.UtcNow)
            {
                throw new InvalidStoreItemException($"Store item { bundle.Name } has expired.");
            }

            var user = context.User.FirstOrDefault(x => x.UserPk == userId);

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

            var allCards = context
                .Card
                .Include(x => x.RarityFkNavigation)
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

            return Task.FromResult(cards.Select(x => x.ToCore(null)));
        }
    }
}
