using CardHero.Core.Models;

namespace CardHero.Data.Abstractions
{
    public class GameCreateData
    {
        public int Rows { get; set; }

        public int Columns { get; set; }

        public GameType Type { get; set; }

        public int MaxPlayers { get; set; }
    }
}
