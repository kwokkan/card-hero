namespace CardHero.Core.Models
{
    /// <summary>
    /// Card collection.
    /// </summary>
    public class CardCollectionModel : ICardHeroEntity
    {
        /// <summary>
        /// Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Card id.
        /// </summary>
        public int CardId { get; set; }

        /// <summary>
        /// User id.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Card.
        /// </summary>
        public virtual CardModel Card { get; set; }
    }
}
