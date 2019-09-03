namespace CardHero.Core.Models
{
    /// <summary>
    /// Card collection.
    /// </summary>
    public class CardCollection : ICardHeroEntity
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
        public virtual Card Card { get; set; }

        /// <summary>
        /// User.
        /// </summary>
        public virtual User User { get; set; }
    }
}
