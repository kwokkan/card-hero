using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework;

public partial class Turn
{
    public int TurnPk { get; set; }

    public byte[] Rowstamp { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int CurrentGameUserFk { get; set; }

    public int GameFk { get; set; }

    public virtual GameUser CurrentGameUserFkNavigation { get; set; }

    public virtual Game GameFkNavigation { get; set; }

    public virtual ICollection<Move> Move { get; } = new List<Move>();
}
