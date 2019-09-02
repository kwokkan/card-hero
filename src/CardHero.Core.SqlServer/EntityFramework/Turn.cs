using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class Turn
    {
        public Turn()
        {
            Move = new HashSet<Move>();
        }

        public int TurnPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int CurrentUserFk { get; set; }
        public int GameFk { get; set; }

        public virtual User CurrentUserFkNavigation { get; set; }
        public virtual Game GameFkNavigation { get; set; }
        public virtual ICollection<Move> Move { get; set; }
    }
}
