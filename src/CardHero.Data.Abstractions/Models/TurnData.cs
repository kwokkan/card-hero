using System;

namespace CardHero.Data.Abstractions
{
    public class TurnData
    {
        public int Id { get; set; }

        public int CurrentUserId { get; set; }

        public int GameId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime? EndTime { get; set; }
    }
}
