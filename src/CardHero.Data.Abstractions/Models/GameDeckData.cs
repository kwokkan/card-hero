using System;

namespace CardHero.Data.Abstractions
{
    public class GameDeckData : IData
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreatedTime { get; set; }

        public int GameUserId { get; set; }
    }
}
