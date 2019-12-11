﻿using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class CardCollection
    {
        public CardCollection()
        {
            DeckCardCollection = new HashSet<DeckCardCollection>();
        }

        public int CardCollectionPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public int CardFk { get; set; }
        public int UserFk { get; set; }
        public DateTime CreatedTime { get; set; }

        public virtual Card CardFkNavigation { get; set; }
        public virtual ICollection<DeckCardCollection> DeckCardCollection { get; set; }
    }
}
