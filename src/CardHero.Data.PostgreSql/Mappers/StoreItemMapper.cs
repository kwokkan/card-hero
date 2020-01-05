using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

namespace CardHero.Data.PostgreSql
{
    internal class StoreItemMapper : IMapper<StoreItem, StoreItemData>
    {
        StoreItemData IMapper<StoreItem, StoreItemData>.Map(StoreItem from)
        {
            return new StoreItemData
            {
                CardPackId = from.CardPackFk,
                Cost = from.Cost,
                Description = from.Description,
                Expiry = from.Expiry,
                Id = from.StoreItemPk,
                ItemCount = from.ItemCount,
                Name = from.Name,
            };
        }

        StoreItem IMapper<StoreItem, StoreItemData>.Map(StoreItemData from)
        {
            throw new System.NotImplementedException();
        }
    }
}
