using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class User
    {
        public User()
        {
            CardCollection = new HashSet<CardCollection>();
            CardFavourite = new HashSet<CardFavourite>();
            Deck = new HashSet<Deck>();
            DeckFavourite = new HashSet<DeckFavourite>();
            GameCurrentUserFkNavigation = new HashSet<Game>();
            GameUser = new HashSet<GameUser>();
            GameWinnerUserFkNavigation = new HashSet<Game>();
        }

        public int UserPk { get; set; }
        public string Identifier { get; set; }
        public DateTime CreatedDate { get; set; }
        public string FullName { get; set; }
        public string IdPsource { get; set; }
        public long Coins { get; set; }

        public virtual ICollection<CardCollection> CardCollection { get; set; }
        public virtual ICollection<CardFavourite> CardFavourite { get; set; }
        public virtual ICollection<Deck> Deck { get; set; }
        public virtual ICollection<DeckFavourite> DeckFavourite { get; set; }
        public virtual ICollection<Game> GameCurrentUserFkNavigation { get; set; }
        public virtual ICollection<GameUser> GameUser { get; set; }
        public virtual ICollection<Game> GameWinnerUserFkNavigation { get; set; }
    }
}
