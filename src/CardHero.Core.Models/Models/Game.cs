using System;
using System.Collections.Generic;

namespace CardHero.Core.Models
{
    /// <summary>
    /// Game.
    /// </summary>
    public class Game : ICardHeroEntity
    {
        /// <summary>
        /// Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Name.
        /// </summary>
        public string Name { get; set; }

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
        public IEnumerable<User> Users { get; set; }

        /// <summary>
        /// Turns.
        /// </summary>
        public IEnumerable<Turn> Turns { get; set; }

        /// <summary>
        /// Current user.
        /// </summary>
        public User CurrentUser { get; set; }

        /// <summary>
        /// Winner.
        /// </summary>
        public User Winner { get; set; }

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
        /// Deck id.
        /// </summary>
        public int DeckId { get; set; }

        /// <summary>
        /// Deck.
        /// </summary>
        public Deck Deck { get; set; }
    }
}
