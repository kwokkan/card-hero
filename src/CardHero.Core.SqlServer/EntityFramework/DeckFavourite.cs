using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class DeckFavourite
    {
        public int DeckFavouritePk { get; set; }
        public int DeckFk { get; set; }
        public int UserFk { get; set; }
    }
}
