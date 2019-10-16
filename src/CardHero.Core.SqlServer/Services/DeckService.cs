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
    public class DeckService : BaseService, IDeckService
    {
        public DeckService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
            : base(contextFactory)
        {
        }

        private async Task<DeckModel> GetDeckByIdInternalAsync(int id, CancellationToken cancellationToken)
        {
            using (var context = GetContext())
            {
                var query = await context.Deck.SingleOrDefaultAsync(x => x.DeckPk == id, cancellationToken: cancellationToken);
                var result = query.ToCore();

                return result;
            }
        }

        async Task<DeckModel> IDeckService.CreateDeckAsync(DeckModel deck, int userId, CancellationToken cancellationToken)
        {
            using (var context = GetContext())
            {
                var entity = new Deck
                {
                    Description = deck.Description,
                    MaxCards = deck.MaxCards,
                    Name = deck.Name,
                    UserFk = userId,
                };
                context.Deck.Add(entity);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                return await GetDeckByIdInternalAsync(entity.DeckPk, cancellationToken);
            }
        }

        Task<DeckModel> IDeckService.GetDeckByIdAsync(int id, CancellationToken cancellationToken)
        {
            return GetDeckByIdInternalAsync(id, cancellationToken);
        }

        async Task<SearchResult<DeckModel>> IDeckService.GetDecksAsync(DeckSearchFilter filter, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var query = context
                .Deck
                .Include(x => x.DeckCardCollection)
                .ThenInclude(x => x.CardCollectionFkNavigation)
                .ThenInclude(x => x.CardFkNavigation)
                .AsQueryable();

            if (filter.Ids != null)
            {
                query = query.Where(x => filter.Ids.Contains(x.DeckPk));
            }

            if (!string.IsNullOrEmpty(filter.Name))
            {
                query = query.Where(x => x.Name.Contains(filter.Name));
            }

            if (filter.UserId.HasValue)
            {
                query = query.Include(x => x.DeckFavourite);
                query = query.Where(x => x.UserFk == filter.UserId.Value);
            }

            var result = await PaginateAndSortAsync(query, filter, x => x.ToCore(filter.UserId), cancellationToken: cancellationToken);

            return result;
        }

        async Task<bool> IDeckService.ToggleFavouriteAsync(int id, int userId, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var favourite = await context
                .DeckFavourite
                .SingleOrDefaultAsync(x => x.DeckFk == id && x.UserFk == userId, cancellationToken: cancellationToken);

            if (favourite == null)
            {
                var newDeckFavourite = new DeckFavourite
                {
                    DeckFk = id,
                    UserFk = userId,
                };

                context.DeckFavourite.Add(newDeckFavourite);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                return true;
            }
            else
            {
                context.DeckFavourite.Remove(favourite);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                return false;
            }
        }

        async Task IDeckService.UpdateCollectionAsync(int id, int userId, IEnumerable<int> cardCollectionIds, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var deck = await context
                .Deck
                .FirstOrDefaultAsync(x => x.DeckPk == id && x.UserFk == userId, cancellationToken: cancellationToken);

            if (deck == null)
            {
                throw new InvalidDeckException("You do not have access to this deck.");
            }

            var distincted = (cardCollectionIds ?? new List<int>()).Distinct().ToList();
            if (distincted.Count > deck.MaxCards)
            {
                throw new InvalidDeckException("Over maximum numer of cards added.");
            }

            var ownedCount = await context
                .CardCollection
                .Where(x => distincted.Contains(x.CardCollectionPk))
                .CountAsync(cancellationToken: cancellationToken);

            if (ownedCount != distincted.Count)
            {
                throw new InvalidCardException("You do not own some of the cards.");
            }

            var existingCards = await context
                .DeckCardCollection
                .Where(x => x.DeckFk == id)
                .ToListAsync(cancellationToken: cancellationToken);

            foreach (var ec in existingCards)
            {
                context.DeckCardCollection.Remove(ec);
            }

            foreach (var d in distincted)
            {
                context.DeckCardCollection.Add(new DeckCardCollection
                {
                    CardCollectionFk = d,
                    DeckFk = id,
                });
            }

            await context.SaveChangesAsync(cancellationToken: cancellationToken);
        }

        Task IDeckService.UpdateDeckAsync(int deckId, DeckModel deck, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
