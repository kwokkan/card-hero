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
        private readonly ICardHeroDataDbContextFactory _factory;
        private readonly IMapper<Deck, DeckData> _deckMapper;

        public DeckRepository(
            ICardHeroDataDbContextFactory factory,
            IMapper<Deck, DeckData> deckMapper
        )
        {
            _factory = factory;
            _deckMapper = deckMapper;
        }

        async Task<DeckData> IDeckRepository.GetDeckByIdAsync(int id, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var deck = await context
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
}
