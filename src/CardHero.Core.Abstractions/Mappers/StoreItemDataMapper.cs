using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class StoreItemDataMapper : IDataMapper<StoreItemData, StoreItemModel>
    {
        StoreItemModel IDataMapper<StoreItemData, StoreItemModel>.Map(StoreItemData from)
        {
            return new StoreItemModel
            {
                Cost = from.Cost,
                Description = from.Description,
                Expiry = from.Expiry,
                Id = from.Id,
                ItemCount = from.ItemCount,
                Name = from.Name,
            };
        }

        StoreItemData IDataMapper<StoreItemData, StoreItemModel>.Map(StoreItemModel from)
        {
            throw new NotImplementedException();
        }
    }
}
