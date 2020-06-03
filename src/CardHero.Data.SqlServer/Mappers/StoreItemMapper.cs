using CardHero.Core.Models;
using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class StoreItemMapper : IMapper<StoreItem, StoreItemData>
    {
        StoreItemData IMapper<StoreItem, StoreItemData>.Map(StoreItem from)
        {
            return new StoreItemData
            {
                CardPackId = from.CardPackFk,
                Expiry = from.Expiry,
                StoreItem = new StoreItemModel
                {
                    Cost = from.Cost,
                    Description = from.Description,
                    Id = from.StoreItemPk,
                    ItemCount = from.ItemCount,
                    Name = from.Name,
                },
            };
        }

        StoreItem IMapper<StoreItem, StoreItemData>.Map(StoreItemData from)
        {
            throw new System.NotImplementedException();
        }
    }
}
