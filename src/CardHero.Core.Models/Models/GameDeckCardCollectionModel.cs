namespace CardHero.Core.Models
{
    /// <summary>
    /// Card to use within a game deck.
    /// </summary>
    public class GameDeckCardCollectionModel
    {
        /// <summary>
        /// Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Game deck id.
        /// </summary>
        public int GameDeckId { get; set; }

        /// <summary>
        /// Card id.
        /// </summary>
        public int CardId { get; set; }

        /// <summary>
        /// Card.
        /// </summary>
        public CardModel Card { get; set; }
    }
}
