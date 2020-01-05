using System;

namespace CardHero.Data.Abstractions
{
    public class StoreItemData
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int Cost { get; set; }

        public int ItemCount { get; set; }

        public DateTime? Expiry { get; set; }

        public int? CardPackId { get; set; }
    }
}
