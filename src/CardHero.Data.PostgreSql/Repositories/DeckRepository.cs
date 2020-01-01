using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.PostgreSql
{
    internal class DeckRepository : IDeckRepository
    {
        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<Deck, DeckData> _deckMapper;

        public DeckRepository(
            CardHeroDataDbContext context,
            IMapper<Deck, DeckData> deckMapper
        )
        {
            _context = context;

            _deckMapper = deckMapper;
        }

        private async Task<DeckData> GetDeckByIdInternalAsync(int id, int userId, CancellationToken cancellationToken)
        {
            var deck = await _context
                .Deck
                .Include(x => x.DeckCardCollection)
                    .ThenInclude(x => x.CardCollectionFkNavigation)
                .Where(x => x.DeckPk == id)
                .Select(x => _deckMapper.Map(x))
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            await PopulateDeckFavouriteAsync(userId, cancellationToken, deck);

            return deck;
        }

        private async Task PopulateDeckFavouriteAsync(int userId, CancellationToken cancellationToken, params DeckData[] decks)
        {
            if (decks.Any())
            {
                var deckIds = decks.Select(x => x.Id).ToArray();

                var deckFavourites = await _context
                    .DeckFavourite
                    .Where(x => deckIds.Contains(x.DeckFk) && x.UserFk == userId)
                    .Select(x => x.DeckFk)
                    .ToArrayAsync(cancellationToken: cancellationToken)
                ;

                foreach (var deck in decks)
                {
                    deck.IsFavourited = deckFavourites.Any(df => df == deck.Id);
                }
            }
        }

        async Task<DeckData> IDeckRepository.CreateDeckAsync(DeckCreateData deck, CancellationToken cancellationToken)
        {
            var entity = new Deck
            {
                Description = deck.Description,
                MaxCards = 5,
                Name = deck.Name,
                UserFk = deck.UserId,
            };
            _context.Deck.Add(entity);

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            return _deckMapper.Map(entity);
        }

        async Task IDeckRepository.FavouriteDeckAsync(int id, int userId, bool favourite, CancellationToken cancellationToken)
        {
            var existingFavourite = await _context
                .DeckFavourite
                .SingleOrDefaultAsync(x => x.DeckFk == id && x.UserFk == userId, cancellationToken: cancellationToken);

            if (favourite && existingFavourite == null)
            {
                var newDeckFavourite = new DeckFavourite
                {
                    DeckFk = id,
                    UserFk = userId,
                };

                _context.DeckFavourite.Add(newDeckFavourite);

                await _context.SaveChangesAsync(cancellationToken: cancellationToken);
            }
            else if (!favourite && existingFavourite != null)
            {
                _context.DeckFavourite.Remove(existingFavourite);

                await _context.SaveChangesAsync(cancellationToken: cancellationToken);
            }
        }

        async Task<ReadOnlyCollection<DeckData>> IDeckRepository.FindDecksAsync(DeckSearchFilter filter, CancellationToken cancellationToken)
        {
            var query = _context
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
                query = query.Where(x => x.UserFk == filter.UserId.Value);
            }

            var results = await query.Select(x => _deckMapper.Map(x)).ToArrayAsync(cancellationToken: cancellationToken);

            if (filter.UserId.HasValue)
            {
                await PopulateDeckFavouriteAsync(filter.UserId.Value, cancellationToken, results);
            }

            return Array.AsReadOnly(results);
        }

        Task<DeckData> IDeckRepository.GetDeckByIdAsync(int id, int userId, CancellationToken cancellationToken)
        {
            return GetDeckByIdInternalAsync(id, userId, cancellationToken);
        }

        async Task<DeckData> IDeckRepository.UpdateDeckAsync(int id, DeckUpdateData update, CancellationToken cancellationToken)
        {
            var deck = await _context.Deck.SingleOrDefaultAsync(x => x.DeckPk == id, cancellationToken: cancellationToken);

            if (deck == null)
            {
                throw new CardHeroDataException($"Deck {id} does not exist.");
            }

            if (update.CardCollectionIds.IsSet && update.CardCollectionIds.Value != null)
            {
                var existingCards = await _context
                    .DeckCardCollection
                    .Where(x => x.DeckFk == id)
                    .ToListAsync(cancellationToken: cancellationToken);

                foreach (var ec in existingCards)
                {
                    _context.DeckCardCollection.Remove(ec);
                }

                foreach (var d in update.CardCollectionIds.Value)
                {
                    _context.DeckCardCollection.Add(new DeckCardCollection
                    {
                        CardCollectionFk = d,
                        DeckFk = id,
                    });
                }
            }

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            return await GetDeckByIdInternalAsync(id, deck.UserFk, cancellationToken: cancellationToken);
        }
    }
}
