using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class StoreItem
    {
        public int StoreItemPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Cost { get; set; }
        public int ItemCount { get; set; }
        public DateTime? Expiry { get; set; }
        public int? CardPackFk { get; set; }

        public virtual CardPack CardPackFkNavigation { get; set; }
    }
}
