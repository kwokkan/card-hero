using System;
using System.Collections.Generic;

namespace CardHero.Data.PostgreSql.EntityFramework
{
    public partial class Rarity
    {
        public Rarity()
        {
            Card = new HashSet<Card>();
        }

        public int RarityPk { get; set; }
        public int Rowstamp { get; set; }
        public string Name { get; set; }
        public int Frequency { get; set; }

        public virtual ICollection<Card> Card { get; set; }
    }
}
