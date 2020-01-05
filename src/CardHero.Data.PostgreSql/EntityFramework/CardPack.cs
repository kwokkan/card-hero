using System;
using System.Collections.Generic;

namespace CardHero.Data.PostgreSql.EntityFramework
{
    public partial class CardPack
    {
        public CardPack()
        {
            StoreItem = new HashSet<StoreItem>();
        }

        public int CardPackPk { get; set; }
        public int Rowstamp { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<StoreItem> StoreItem { get; set; }
    }
}
