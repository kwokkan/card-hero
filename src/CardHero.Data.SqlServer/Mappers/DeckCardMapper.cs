using System;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class DeckCardMapper : IMapper<DeckCardCollection, DeckCardData>
    {
        public DeckCardData Map(DeckCardCollection from)
        {
            return new DeckCardData
            {
                CardCollectionId = from.CardCollectionFk,
                CardId = from.CardCollectionFkNavigation.CardFk,
                Id = from.DeckCardCollectionPk,
            };
        }

        public DeckCardCollection Map(DeckCardData from)
        {
            throw new NotImplementedException();
        }
    }
}
