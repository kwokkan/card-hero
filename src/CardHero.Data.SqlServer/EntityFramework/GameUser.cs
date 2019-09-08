using System;
using System.Collections.Generic;

namespace CardHero.Data.SqlServer.EntityFramework
{
    public partial class GameUser
    {
        public GameUser()
        {
            GameCurrentGameUserFkNavigation = new HashSet<Game>();
            GameDeck = new HashSet<GameDeck>();
            GameWinnerFkNavigation = new HashSet<Game>();
        }

        public int GameUserPk { get; set; }
        public byte[] Rowstamp { get; set; }
        public int GameFk { get; set; }
        public int UserFk { get; set; }
        public DateTime JoinedTime { get; set; }
        public int? Order { get; set; }

        public virtual Game GameFkNavigation { get; set; }
        public virtual ICollection<Game> GameCurrentGameUserFkNavigation { get; set; }
        public virtual ICollection<GameDeck> GameDeck { get; set; }
        public virtual ICollection<Game> GameWinnerFkNavigation { get; set; }
    }
}
