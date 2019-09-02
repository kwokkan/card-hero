using System;
using System.Collections.Generic;
using CardHero.Core.Enums;

namespace CardHero.Core.Models
{
	public class Game : ICardHeroEntity
    {
		public int Id { get; set; }

        public string Name { get; set; }

		public DateTime StartTime { get; set; }

		public DateTime? EndTime { get; set; }

		public IEnumerable<User> Users { get; set; }

		public IEnumerable<Turn> Turns { get; set; }

		public User CurrentUser { get; set; }

		public User Winner { get; set; }

		public int Columns { get; set; }

		public int Rows { get; set; }

        public GameType Type { get; set; }

        public Deck Deck { get; set; }
	}
}
