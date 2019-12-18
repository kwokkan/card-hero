﻿using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    public class StoreItemMapper : IMapper<StoreItem, StoreItemData>
    {
        StoreItemData IMapper<StoreItem, StoreItemData>.Map(StoreItem from)
        {
            return new StoreItemData
            {
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
