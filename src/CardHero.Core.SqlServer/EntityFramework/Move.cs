using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class Move
    {
        public int MovePk { get; set; }
        public string Rowstamp { get; set; }
        public DateTime CreatedTime { get; set; }
        public int TurnFk { get; set; }
        public int CardCollectionFk { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }

        public virtual CardCollection CardCollectionFkNavigation { get; set; }
        public virtual Turn TurnFkNavigation { get; set; }
    }
}
