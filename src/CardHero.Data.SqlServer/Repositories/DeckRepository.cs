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

        public async Task<DeckData> GetDeckByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            using (var context = _factory.Create())
            {
                var deck = await context
                    .Deck
                    .Where(x => x.DeckPk == id)
                    .Select(x => _deckMapper.Map(x))
                    .FirstOrDefaultAsync(cancellationToken: cancellationToken);

                return deck;
            }
        }
    }
}
