using System.Linq;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class DeckMapper : IMapper<Deck, DeckData>
    {
        private readonly IMapper<DeckCardCollection, DeckCardData> _deckCardMapper;

        public DeckMapper(IMapper<DeckCardCollection, DeckCardData> deckCardMapper)
        {
            _deckCardMapper = deckCardMapper;
        }

        DeckData IMapper<Deck, DeckData>.Map(Deck from)
        {
            return new DeckData
            {
                Description = from.Description,
                Id = from.DeckPk,
                MaxCards = from.MaxCards,
                Name = from.Name,
                UserId = from.UserFk,

                Cards = from.DeckCardCollection.Select(x => _deckCardMapper.Map(x)).ToArray(),
            };
        }

        Deck IMapper<Deck, DeckData>.Map(DeckData from)
        {
            throw new System.NotImplementedException();
        }
    }
}
