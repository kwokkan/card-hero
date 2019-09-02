using System;

namespace CardHero.Core.Models
{
    /// <summary>
    /// Turn.
    /// </summary>
	public class Turn : ICardHeroEntity
    {
        /// <summary>
        /// Id.
        /// </summary>
		public int Id { get; set; }

        /// <summary>
        /// Start time.
        /// </summary>
		public DateTime StartTime { get; set; }

        /// <summary>
        /// End time.
        /// </summary>
		public DateTime? EndTime { get; set; }

        /// <summary>
        /// User.
        /// </summary>
        public User User { get; set; }

        /// <summary>
        /// Game.
        /// </summary>
		public Game Game { get; set; }
	}
}
