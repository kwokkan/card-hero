using System;

namespace CardHero.Core.Models
{
	public class Turn : ICardHeroEntity
    {
		public int Id { get; set; }

		public DateTime StartTime { get; set; }

		public DateTime? EndTime { get; set; }

		public User User { get; set; }

		public Game Game { get; set; }
	}
}
