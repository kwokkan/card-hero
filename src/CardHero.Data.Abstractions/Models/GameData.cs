using System;

namespace CardHero.Data.Abstractions
{
    public class GameData
    {
        public int Id { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public int? CurrentGameUserId { get; set; }

        public int? WinnerId { get; set; }

        public int Rows { get; set; }

        public int Columns { get; set; }

        public GameType Type { get; set; }

        public int MaxPlayers { get; set; }
    }
}
