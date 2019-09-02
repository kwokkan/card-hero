using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class Game
    {
        public Game()
        {
            GameUser = new HashSet<GameUser>();
            Turn = new HashSet<Turn>();
        }

        public int GamePk { get; set; }
        public byte[] Rowstamp { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int CurrentUserFk { get; set; }
        public int? WinnerFk { get; set; }
        public int Rows { get; set; }
        public int Columns { get; set; }
        public int GameTypeFk { get; set; }
        public int? DeckFk { get; set; }

        public virtual User CurrentUserFkNavigation { get; set; }
        public virtual Deck DeckFkNavigation { get; set; }
        public virtual GameType GameTypeFkNavigation { get; set; }
        public virtual User WinnerFkNavigation { get; set; }
        public virtual ICollection<GameUser> GameUser { get; set; }
        public virtual ICollection<Turn> Turn { get; set; }
    }
}
