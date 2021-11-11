using System;
using System.Collections.Generic;

namespace CardHero.Data.PostgreSql.EntityFramework
{
    public partial class GameUser
    {
        public GameUser()
        {
            GameDeck = new HashSet<GameDeck>();
            Turn = new HashSet<Turn>();
        }

        public int GameUserPk { get; set; }
        public int Rowstamp { get; set; }
        public int GameFk { get; set; }
        public int UserFk { get; set; }
        public DateTime JoinedTime { get; set; }
        public int? Order { get; set; }

        public virtual Game GameFkNavigation { get; set; }
        public virtual User UserFkNavigation { get; set; }
        public virtual ICollection<GameDeck> GameDeck { get; set; }
        public virtual ICollection<Turn> Turn { get; set; }
    }
}
