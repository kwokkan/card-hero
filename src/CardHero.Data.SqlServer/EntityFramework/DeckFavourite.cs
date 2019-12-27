using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class DeckFavourite
    {
        public int DeckFavouritePk { get; set; }
        public int DeckFk { get; set; }
        public int UserFk { get; set; }

        public virtual Deck DeckFkNavigation { get; set; }
        public virtual User UserFkNavigation { get; set; }
    }
}
