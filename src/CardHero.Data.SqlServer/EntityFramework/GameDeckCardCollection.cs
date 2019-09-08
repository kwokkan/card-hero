using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class GameDeckCardCollection
    {
        public int GameDeckCardCollectionPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public int GameDeckFk { get; set; }
        public int CardFk { get; set; }

        public virtual GameDeck GameDeckFkNavigation { get; set; }
    }
}
