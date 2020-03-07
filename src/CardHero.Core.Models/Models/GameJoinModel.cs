namespace CardHero.Core.Models
{
    /// <summary>
    /// Model for joining a game.
    /// </summary>
    public class GameJoinModel
    {
        /// <summary>
        /// User joining.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Deck to use.
        /// </summary>
        public int DeckId { get; set; }
    }
}
