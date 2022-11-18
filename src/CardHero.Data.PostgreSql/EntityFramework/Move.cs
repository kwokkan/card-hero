using System;
using System.Collections.Generic;

namespace CardHero.Data.PostgreSql.EntityFramework;

public partial class Move
{
    public int MovePk { get; set; }

    public int Rowstamp { get; set; }

    public DateTime CreatedTime { get; set; }

    public int TurnFk { get; set; }

    public int GameDeckCardCollectionFk { get; set; }

    public int Row { get; set; }

    public int Column { get; set; }

    public virtual GameDeckCardCollection GameDeckCardCollectionFkNavigation { get; set; }

    public virtual Turn TurnFkNavigation { get; set; }
}
