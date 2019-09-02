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
    public class CardService : BaseService, ICardService
	{
		public CardService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory, IOptions<CardHeroOptions> options)
			: base(contextFactory, options)
		{
		}

        public async Task<IEnumerable<Models.CardCollection>> AddCardsToCardCollectionAsync(IEnumerable<int> cardIds, int userId)
        {
            if (cardIds == null)
            {
                return null;
            }

            if (!cardIds.Any())
            {
                return new Models.CardCollection[0];
            }

            var cardCollections = cardIds
                .Select(x => new EntityFramework.CardCollection
                {
                    CardFk = x,
                    CreatedTime = DateTime.UtcNow,
                    UserFk = userId,
                })
                .ToArray();

            var context = GetContext();

            await context.CardCollection.AddRangeAsync(cardCollections);

            context.SaveChanges();

            var cardCollectionIds = cardCollections.Select(x => x.CardCollectionPk).ToArray();
            return (await GetCardCollectionAsync(new CardCollectionSearchFilter
            {
                Ids = cardCollectionIds
            })).Results;
        }

        public Task<SearchResult<Core.Models.CardCollection>> GetCardCollectionAsync(CardCollectionSearchFilter filter)
        {
            var result = new SearchResult<Core.Models.CardCollection>();

            var context = GetContext();

            var query = context.CardCollection
                .Include(x => x.CardFkNavigation)
                .Include(x => x.UserFkNavigation)
                .AsQueryable();

            if (filter.Ids != null && filter.Ids.Any())
            {
                query = query.Where(x => filter.Ids.Contains(x.CardCollectionPk));
            }

            if (filter.UserId.HasValue)
            {
                query = query
                    .Include(x => x.CardFkNavigation)
                    .ThenInclude(x => x.CardFavourite);
                query = query.Where(x => x.UserFk == filter.UserId.Value);
            }

            return PaginateAndSortAsync(query, filter, x => x.ToCore(filter.UserId));
        }

		public Task<SearchResult<Core.Models.Card>> GetCardsAsync(CardSearchFilter filter)
		{
			var result = new SearchResult<Core.Models.Card>();

			var context = GetContext();

			var query = context.Card.AsQueryable();

            if (filter.UserId.HasValue)
            {
                query = query.Include(x => x.CardFavourite);
            }

			if (filter.Ids != null)
			{
				query = query.Where(x => filter.Ids.Contains(x.CardPk));
			}

			if (!string.IsNullOrEmpty(filter.Name))
			{
				query = query.Where(x => x.Name.IndexOf(filter.Name, StringComparison.OrdinalIgnoreCase) > -1);
			}

			return PaginateAndSortAsync(query, filter, x => x.ToCore(filter.UserId));
		}

        public async Task<bool> ToggleFavouriteAsync(int id, int userId)
        {
            var context = GetContext();

            var favourite = context
                .CardFavourite
                .SingleOrDefault(x => x.CardFk == id && x.UserFk == userId);

            if (favourite == null)
            {
                var newCardFavourite = new CardFavourite
                {
                    CardFk = id,
                    UserFk = userId
                };

                context.CardFavourite.Add(newCardFavourite);

                await context.SaveChangesAsync();

                return true;
            }
            else
            {
                context.CardFavourite.Remove(favourite);

                await context.SaveChangesAsync();

                return false;
            }
        }
    }
}
