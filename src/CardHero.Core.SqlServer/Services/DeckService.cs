using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<DeckModel> CreateDeckAsync(DeckModel deck, int userId)
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

                await context.SaveChangesAsync();

                return await GetDeckByIdAsync(entity.DeckPk);
            }
        }

        public Task<DeckModel> GetDeckByIdAsync(int id)
        {
            using (var context = GetContext())
            {
                var query = context.Deck.SingleOrDefault(x => x.DeckPk == id);
                var result = query.ToCore();

                return Task.FromResult(result);
            }
        }

        public async Task<SearchResult<DeckModel>> GetDecksAsync(DeckSearchFilter filter)
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

            var result = await PaginateAndSortAsync(query, filter, x => x.ToCore(filter.UserId));

            return result;
        }

        public bool ToggleFavourite(int id, int userId)
        {
            var context = GetContext();

            var favourite = context
                .DeckFavourite
                .SingleOrDefault(x => x.DeckFk == id && x.UserFk == userId);

            if (favourite == null)
            {
                var newDeckFavourite = new DeckFavourite
                {
                    DeckFk = id,
                    UserFk = userId,
                };

                context.DeckFavourite.Add(newDeckFavourite);

                context.SaveChanges();

                return true;
            }
            else
            {
                context.DeckFavourite.Remove(favourite);

                context.SaveChanges();

                return false;
            }
        }

        public void UpdateCollection(int id, int userId, IEnumerable<int> cardCollectionIds)
        {
            var context = GetContext();

            var deck = context
                .Deck
                .FirstOrDefault(x => x.DeckPk == id && x.UserFk == userId);

            if (deck == null)
            {
                throw new InvalidDeckException("You do not have access to this deck.");
            }

            var distincted = (cardCollectionIds ?? new List<int>()).Distinct().ToList();
            if (distincted.Count > deck.MaxCards)
            {
                throw new InvalidDeckException("Over maximum numer of cards added.");
            }

            var ownedCount = context
                .CardCollection
                .Where(x => distincted.Contains(x.CardCollectionPk))
                .Count();

            if (ownedCount != distincted.Count)
            {
                throw new InvalidCardException("You do not own some of the cards.");
            }

            var existingCards = context
                .DeckCardCollection
                .Where(x => x.DeckFk == id)
                .ToList();

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

            context.SaveChanges();
        }

        public Task UpdateDeckAsync(int deckId, DeckModel deck)
        {
            throw new NotImplementedException();
        }
    }
}
