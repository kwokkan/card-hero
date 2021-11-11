using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class Card
    {
        public Card()
        {
            CardCollection = new HashSet<CardCollection>();
            CardFavourite = new HashSet<CardFavourite>();
            GameDeckCardCollection = new HashSet<GameDeckCardCollection>();
        }

        public int CardPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UpAttack { get; set; }
        public int RightAttack { get; set; }
        public int DownAttack { get; set; }
        public int LeftAttack { get; set; }
        public int Health { get; set; }
        public int Attack { get; set; }
        public int Defence { get; set; }
        public int RarityFk { get; set; }
        public int TotalStats { get; set; }
        public int CardPackFk { get; set; }
        public int CardPackId { get; set; }

        public virtual CardPack CardPackFkNavigation { get; set; }
        public virtual Rarity RarityFkNavigation { get; set; }
        public virtual ICollection<CardCollection> CardCollection { get; set; }
        public virtual ICollection<CardFavourite> CardFavourite { get; set; }
        public virtual ICollection<GameDeckCardCollection> GameDeckCardCollection { get; set; }
    }
}
