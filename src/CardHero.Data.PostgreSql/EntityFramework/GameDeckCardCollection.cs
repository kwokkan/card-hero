﻿using System;
using System.Collections.Generic;

#nullable disable

namespace CardHero.Data.PostgreSql.EntityFramework
{
    public partial class GameDeckCardCollection
    {
        public GameDeckCardCollection()
        {
            Move = new HashSet<Move>();
        }

        public int GameDeckCardCollectionPk { get; set; }
        public int Rowstamp { get; set; }
        public int GameDeckFk { get; set; }
        public int CardFk { get; set; }

        public virtual Card CardFkNavigation { get; set; }
        public virtual GameDeck GameDeckFkNavigation { get; set; }
        public virtual ICollection<Move> Move { get; set; }
    }
}
