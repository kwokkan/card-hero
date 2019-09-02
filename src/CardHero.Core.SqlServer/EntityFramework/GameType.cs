using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class GameType
    {
        public GameType()
        {
            Game = new HashSet<Game>();
        }

        public int GameTypePk { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Game> Game { get; set; }
    }
}
