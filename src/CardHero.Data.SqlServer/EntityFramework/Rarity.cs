using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework;

public partial class Rarity
{
    public int RarityPk { get; set; }

    public byte[] Rowstamp { get; set; }

    public string Name { get; set; }

    public int Frequency { get; set; }

    public virtual ICollection<Card> Card { get; } = new List<Card>();
}
