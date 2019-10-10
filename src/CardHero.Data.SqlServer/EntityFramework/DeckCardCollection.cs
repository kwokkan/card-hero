﻿using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class DeckCardCollection
    {
        public int DeckCardCollectionPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public int DeckFk { get; set; }
        public int CardCollectionFk { get; set; }

        public virtual CardCollection CardCollectionFkNavigation { get; set; }
        public virtual Deck DeckFkNavigation { get; set; }
    }
}
