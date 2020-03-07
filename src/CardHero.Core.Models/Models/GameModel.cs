using System;
using System.Collections.Generic;

namespace CardHero.Core.Models
{
    /// <summary>
    /// Game.
    /// </summary>
    public class GameModel : ICardHeroEntity
    {
        /// <summary>
        /// Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Sart time.
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        /// End time.
        /// </summary>
        public DateTime? EndTime { get; set; }

        /// <summary>
        /// Users.
        /// </summary>
        public IEnumerable<int> UserIds { get; set; }

        /// <summary>
        /// Current user id.
        /// </summary>
        public int? CurrentUserId { get; set; }

        /// <summary>
        /// Winner user id.
        /// </summary>
        public int? WinnerUserId { get; set; }

        /// <summary>
        /// Columns.
        /// </summary>
        public int Columns { get; set; }

        /// <summary>
        /// Rows.
        /// </summary>
        public int Rows { get; set; }

        /// <summary>
        /// Game type.
        /// </summary>
        public GameType Type { get; set; }

        /// <summary>
        /// Game deck id.
        /// </summary>
        public int GameDeckId { get; set; }

        /// <summary>
        /// Game deck.
        /// </summary>
        public GameDeckModel GameDeck { get; set; }

        /// <summary>
        /// Maximum number of people who can play the game.
        /// </summary>
        public int MaxUsers { get; set; } = 2;
    }
}
