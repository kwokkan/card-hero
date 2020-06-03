using System;

using CardHero.Core.Models;

namespace CardHero.Data.Abstractions
{
    public class StoreItemData
    {
        public StoreItemModel StoreItem { get; set; }

        public DateTime? Expiry { get; set; }

        public int? CardPackId { get; set; }
    }
}
