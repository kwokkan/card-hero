namespace CardHero.Core.Models
{
    /// <summary>
    /// Model for creating a new deck.
    /// </summary>
    public class DeckCreateModel
    {
        /// <summary>
        /// Name of deck.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Description of deck.
        /// </summary>
        public string Description { get; set; }
    }
}
