using System;
using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    public class GameSearchFilter : SearchFilter<Game>
    {
        public int? GameId { get; set; }

        public string Name { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public int PlayerCount { get; set; }

        public bool ActiveOnly { get; set; } = true;

        public GameType? Type { get; set; }
    }
}
