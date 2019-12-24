using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class CardFavourite
    {
        public int CardFavouritePk { get; set; }
        public int CardFk { get; set; }
        public int UserFk { get; set; }
    }
}
