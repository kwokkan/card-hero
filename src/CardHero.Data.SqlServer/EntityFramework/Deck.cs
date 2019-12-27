using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class Deck
    {
        public Deck()
        {
            DeckCardCollection = new HashSet<DeckCardCollection>();
            DeckFavourite = new HashSet<DeckFavourite>();
        }

        public int DeckPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MaxCards { get; set; }
        public int UserFk { get; set; }

        public virtual User UserFkNavigation { get; set; }
        public virtual ICollection<DeckCardCollection> DeckCardCollection { get; set; }
        public virtual ICollection<DeckFavourite> DeckFavourite { get; set; }
    }
}
