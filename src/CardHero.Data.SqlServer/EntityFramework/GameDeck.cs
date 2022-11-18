using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework;

public partial class GameDeck
{
    public int GameDeckPk { get; set; }

    public byte[] Rowstamp { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public DateTime CreatedTime { get; set; }

    public int GameUserFk { get; set; }

    public virtual ICollection<GameDeckCardCollection> GameDeckCardCollection { get; } = new List<GameDeckCardCollection>();

    public virtual GameUser GameUserFkNavigation { get; set; }
}
