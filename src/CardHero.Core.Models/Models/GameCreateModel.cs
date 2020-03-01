namespace CardHero.Core.Models
{
    /// <summary>
    /// Model for creating a new game.
    /// </summary>
    public class GameCreateModel
    {
        /// <summary>
        /// Type of game.
        /// </summary>
        public GameType Type { get; set; }

        /// <summary>
        /// Deck to use.
        /// </summary>
        public int DeckId { get; set; }

        /// <summary>
        /// Users in game.
        /// </summary>
        public UserModel[] Users { get; set; }

        /// <summary>
        /// Max players in game.
        /// </summary>
        public int MaxPlayers { get; set; }

        /// <summary>
        /// Columns in game.
        /// </summary>
        public int Columns { get; set; }

        /// <summary>
        /// Rows in game.
        /// </summary>
        public int Rows { get; set; }
    }
}
