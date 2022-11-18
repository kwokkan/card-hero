using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework;

public partial class CardCollection
{
    public int CardCollectionPk { get; set; }

    public byte[] Rowstamp { get; set; }

    public int CardFk { get; set; }

    public int UserFk { get; set; }

    public DateTime CreatedTime { get; set; }

    public virtual Card CardFkNavigation { get; set; }

    public virtual ICollection<DeckCardCollection> DeckCardCollection { get; } = new List<DeckCardCollection>();

    public virtual User UserFkNavigation { get; set; }
}
