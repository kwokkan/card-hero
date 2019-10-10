﻿using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class CardCollection
    {
        public CardCollection()
        {
            DeckCardCollection = new HashSet<DeckCardCollection>();
            Move = new HashSet<Move>();
        }

        public int CardCollectionPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public int CardFk { get; set; }
        public int UserFk { get; set; }
        public DateTime CreatedTime { get; set; }

        public virtual Card CardFkNavigation { get; set; }
        public virtual User UserFkNavigation { get; set; }
        public virtual ICollection<DeckCardCollection> DeckCardCollection { get; set; }
        public virtual ICollection<Move> Move { get; set; }
    }
}
