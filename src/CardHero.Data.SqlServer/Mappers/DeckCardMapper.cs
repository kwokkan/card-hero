using System;
using System.Linq.Expressions;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class DeckCardMapper : IMapper<DeckCardCollection, DeckCardData>
    {
        Expression<Func<DeckCardCollection, DeckCardData>> IMapper<DeckCardCollection, DeckCardData>.Map
        {
            get
            {
                return source => new DeckCardData
                {
                    CardCollectionId = source.CardCollectionFk,
                    CardId = source.CardCollectionFkNavigation.CardFk,
                    Id = source.DeckCardCollectionPk,
                };
            }
        }
    }
}
