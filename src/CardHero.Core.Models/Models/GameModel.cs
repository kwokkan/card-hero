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
        public IEnumerable<GameUserModel> Users { get; set; }

        /// <summary>
        /// Turns.
        /// </summary>
        public IEnumerable<TurnModel> Turns { get; set; }

        /// <summary>
        /// Current user.
        /// </summary>
        public UserModel CurrentUser { get; set; }

        /// <summary>
        /// Winner.
        /// </summary>
        public UserModel Winner { get; set; }

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
        public DeckModel Deck { get; set; }

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

        /// <summary>
        /// Whether a user can join this game.
        /// </summary>
        /// <remarks>Needs to be logged in.</remarks>
        public bool CanJoin { get; set; }

        /// <summary>
        /// Whether the user can make their move.
        /// </summary>
        /// <remarks>Needs to be logged in.</remarks>
        public bool CanPlay { get; set; }
    }
}
