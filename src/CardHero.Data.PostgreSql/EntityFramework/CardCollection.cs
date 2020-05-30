using System;
using System.Collections.Generic;

namespace CardHero.Data.PostgreSql.EntityFramework
{
    public partial class CardCollection
    {
        public CardCollection()
        {
            DeckCardCollection = new HashSet<DeckCardCollection>();
        }

        public int CardCollectionPk { get; set; }
        public int Rowstamp { get; set; }
        public int CardFk { get; set; }
        public int UserFk { get; set; }
        public DateTime CreatedTime { get; set; }

        public virtual Card CardFkNavigation { get; set; }
        public virtual User UserFkNavigation { get; set; }
        public virtual ICollection<DeckCardCollection> DeckCardCollection { get; set; }
    }
}
