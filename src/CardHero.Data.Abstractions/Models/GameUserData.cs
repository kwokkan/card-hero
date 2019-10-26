using System;

namespace CardHero.Data.Abstractions
{
    public class GameUserData
    {
        public int Id { get; set; }

        public DateTime JoinedTime { get; set; }

        public int UserId { get; set; }

        public int GameId { get; set; }

        public int? Order { get; set; }
    }
}
