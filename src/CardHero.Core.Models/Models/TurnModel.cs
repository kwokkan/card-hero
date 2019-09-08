using System;

namespace CardHero.Core.Models
{
    /// <summary>
    /// Turn.
    /// </summary>
    public class TurnModel : ICardHeroEntity
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
        public UserModel User { get; set; }

        /// <summary>
        /// Game.
        /// </summary>
        public GameModel Game { get; set; }
    }
}
