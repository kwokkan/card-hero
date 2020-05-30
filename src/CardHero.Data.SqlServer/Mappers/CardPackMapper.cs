using CardHero.Core.Models;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class CardPackMapper : IMapper<CardPack, CardPackModel>
    {
        CardPackModel IMapper<CardPack, CardPackModel>.Map(CardPack from)
        {
            return new CardPackModel
            {
                Description = from.Description,
                Id = from.CardPackPk,
                Name = from.Name,
            };
        }

        CardPack IMapper<CardPack, CardPackModel>.Map(CardPackModel from)
        {
            throw new System.NotImplementedException();
        }
    }
}
