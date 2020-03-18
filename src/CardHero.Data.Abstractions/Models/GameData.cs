using System;

using CardHero.Core.Models;

namespace CardHero.Data.Abstractions
{
    public class GameData
    {
        public int Id { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public int? CurrentUserId { get; set; }

        public int? WinnerUserId { get; set; }

        public int Rows { get; set; }

        public int Columns { get; set; }

        public GameType Type { get; set; }

        public int MaxPlayers { get; set; }
    }
}
