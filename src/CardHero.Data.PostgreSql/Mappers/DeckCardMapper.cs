using System;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

namespace CardHero.Data.PostgreSql
{
    internal class DeckCardMapper : IMapper<DeckCardCollection, DeckCardData>
    {
        DeckCardData IMapper<DeckCardCollection, DeckCardData>.Map(DeckCardCollection from)
        {
            return new DeckCardData
            {
                CardCollectionId = from.CardCollectionFk,
                CardId = from.CardCollectionFkNavigation.CardFk,
                Id = from.DeckCardCollectionPk,
            };
        }

        DeckCardCollection IMapper<DeckCardCollection, DeckCardData>.Map(DeckCardData from)
        {
            throw new NotImplementedException();
        }
    }
}
