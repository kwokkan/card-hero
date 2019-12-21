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
    public class CardCollectionService : BaseService, ICardCollectionService
    {
        public CardCollectionService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
            : base(contextFactory)
        {
        }

        private Task<SearchResult<CardCollectionModel>> GetCardCollectionInternalAsync(CardCollectionSearchFilter filter, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var query = context.CardCollection
                .Include(x => x.CardFkNavigation)
                .AsQueryable();

            if (!string.IsNullOrEmpty(filter.Name))
            {
                query = query.Where(x => x.CardFkNavigation.Name.Contains(filter.Name));
            }

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

            return PaginateAndSortAsync(query, filter, x => x.ToCore(filter.UserId), cancellationToken: cancellationToken);
        }

        async Task<CardCollectionModel[]> ICardCollectionService.AddCardsToCardCollectionAsync(IEnumerable<int> cardIds, int userId, CancellationToken cancellationToken)
        {
            if (cardIds == null)
            {
                return null;
            }

            if (!cardIds.Any())
            {
                return Array.Empty<CardCollectionModel>();
            }

            var cardCollections = cardIds
                .Select(x => new CardCollection
                {
                    CardFk = x,
                    CreatedTime = DateTime.UtcNow,
                    UserFk = userId,
                })
                .ToArray();

            var context = GetContext();

            await context.CardCollection.AddRangeAsync(cardCollections);

            await context.SaveChangesAsync(cancellationToken: cancellationToken);

            var cardCollectionIds = cardCollections.Select(x => x.CardCollectionPk).ToArray();
            var searchResult = await GetCardCollectionInternalAsync(new CardCollectionSearchFilter { Ids = cardCollectionIds }, cancellationToken);

            return searchResult.Results;
        }

        Task<SearchResult<CardCollectionModel>> ICardCollectionService.GetCardCollectionAsync(CardCollectionSearchFilter filter, CancellationToken cancellationToken)
        {
            return GetCardCollectionInternalAsync(filter, cancellationToken);
        }
    }
}
