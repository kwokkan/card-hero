using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class CardPack
    {
        public CardPack()
        {
            Card = new HashSet<Card>();
            StoreItem = new HashSet<StoreItem>();
        }

        public int CardPackPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Card> Card { get; set; }
        public virtual ICollection<StoreItem> StoreItem { get; set; }
    }
}
