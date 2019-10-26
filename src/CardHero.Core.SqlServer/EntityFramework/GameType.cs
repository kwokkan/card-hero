using System;
using System.Collections.Generic;

namespace CardHero.Core.SqlServer.EntityFramework
{
    public partial class GameType
    {
        public GameType()
        {
        }

        public int GameTypePk { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
