using System;
using System.Collections.Generic;

namespace CardHero.Data.PostgreSql.EntityFramework
{
    public partial class Turn
    {
        public Turn()
        {
            Move = new HashSet<Move>();
        }

        public int TurnPk { get; set; }
        public int Rowstamp { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int CurrentGameUserFk { get; set; }
        public int GameFk { get; set; }

        public virtual GameUser CurrentGameUserFkNavigation { get; set; }
        public virtual Game GameFkNavigation { get; set; }
        public virtual ICollection<Move> Move { get; set; }
    }
}
