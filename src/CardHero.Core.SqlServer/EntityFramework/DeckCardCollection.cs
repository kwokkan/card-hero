using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class DeckCardCollection
    {
        public int DeckCardCollectionPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public int DeckFk { get; set; }
        public int CardCollectionFk { get; set; }

        public virtual Deck DeckFkNavigation { get; set; }
    }
}
