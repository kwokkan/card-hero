namespace CardHero.Core.Models
{
    /// <summary>
    /// Deck caard.
    /// </summary>
    public class DeckCardModel
    {
        /// <summary>
        /// Card collection id.
        /// </summary>
        public int CardCollectionId { get; set; }

        /// <summary>
        /// Card.
        /// </summary>
        public CardModel Card { get; set; }
    }
}
