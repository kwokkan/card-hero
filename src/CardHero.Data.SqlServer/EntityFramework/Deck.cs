using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class Deck
    {
        public int DeckPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MaxCards { get; set; }
        public int UserFk { get; set; }
    }
}
