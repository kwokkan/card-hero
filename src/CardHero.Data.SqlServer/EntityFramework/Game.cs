using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework;

public partial class Game
{
    public int GamePk { get; set; }

    public byte[] Rowstamp { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public int? CurrentUserFk { get; set; }

    public int? WinnerUserFk { get; set; }

    public int Rows { get; set; }

    public int Columns { get; set; }

    public int GameTypeFk { get; set; }

    public int MaxPlayers { get; set; }

    public virtual User CurrentUserFkNavigation { get; set; }

    public virtual ICollection<GameUser> GameUser { get; } = new List<GameUser>();

    public virtual ICollection<Turn> Turn { get; } = new List<Turn>();

    public virtual User WinnerUserFkNavigation { get; set; }
}
