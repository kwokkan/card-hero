using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
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

        Task<ReadOnlyCollection<DeckData>> IDeckRepository.FindDecksAsync(DeckSearchFilter filter, CancellationToken cancellationToken)
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
                //TODO: Bring back later
                //query = query.Include(x => x.DeckFavourite);
                query = query.Where(x => x.UserFk == filter.UserId.Value);
            }

            var results = query.Select(_deckMapper.Map).ToArray();

            return Task.FromResult(Array.AsReadOnly(results));
        }

        async Task<DeckData> IDeckRepository.GetDeckByIdAsync(int id, CancellationToken cancellationToken)
        {
            var deck = await _context
                .Deck
                .Include(x => x.DeckCardCollection)
                    .ThenInclude(x => x.CardCollectionFkNavigation)
                .Where(x => x.DeckPk == id)
                .Select(x => _deckMapper.Map(x))
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            return deck;
        }
    }
}
