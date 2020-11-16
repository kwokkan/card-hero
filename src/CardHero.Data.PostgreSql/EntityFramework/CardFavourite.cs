﻿using System;
using System.Collections.Generic;

#nullable disable

namespace CardHero.Data.PostgreSql.EntityFramework
{
    public partial class CardFavourite
    {
        public int CardFavouritePk { get; set; }
        public int CardFk { get; set; }
        public int UserFk { get; set; }

        public virtual Card CardFkNavigation { get; set; }
        public virtual User UserFkNavigation { get; set; }
    }
}
