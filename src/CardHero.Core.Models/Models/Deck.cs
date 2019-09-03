using System.Collections.Generic;

namespace CardHero.Core.Models
{
    /// <summary>
    /// Deck.
    /// </summary>
    public class Deck : ICardHeroEntity
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
        /// Description.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Max cards.
        /// </summary>
        public int MaxCards { get; set; }

        /// <summary>
        /// Is favourited.
        /// </summary>
        public bool IsFavourited { get; set; }

        /// <summary>
        /// List of cards.
        /// </summary>
        public IEnumerable<DeckCard> Cards { get; set; }
    }
}
