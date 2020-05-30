using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

namespace CardHero.Data.PostgreSql
{
    internal class CardCollectionMapper : IMapper<CardCollection, CardCollectionData>
    {
        CardCollectionData IMapper<CardCollection, CardCollectionData>.Map(CardCollection from)
        {
            return new CardCollectionData
            {
                CardId = from.CardFk,
                Id = from.CardCollectionPk,
                UserId = from.UserFk,
            };
        }

        CardCollection IMapper<CardCollection, CardCollectionData>.Map(CardCollectionData from)
        {
            throw new System.NotImplementedException();
        }
    }
}
