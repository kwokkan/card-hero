using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

namespace CardHero.Data.PostgreSql
{
    internal class CardPackMapper : IMapper<CardPack, CardPackData>
    {
        CardPackData IMapper<CardPack, CardPackData>.Map(CardPack from)
        {
            return new CardPackData
            {
                Description = from.Description,
                Id = from.CardPackPk,
                Name = from.Name,
            };
        }

        CardPack IMapper<CardPack, CardPackData>.Map(CardPackData from)
        {
            throw new System.NotImplementedException();
        }
    }
}
