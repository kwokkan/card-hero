namespace CardHero.Core.Models
{
    /// <summary>
    /// Card.
    /// </summary>
    public class CardModel : ICardHeroEntity
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
        /// Up attack.
        /// </summary>
        public int UpAttack { get; set; }

        /// <summary>
        /// Right attack.
        /// </summary>
        public int RightAttack { get; set; }

        /// <summary>
        /// Down attack.
        /// </summary>
        public int DownAttack { get; set; }

        /// <summary>
        /// Left attack.
        /// </summary>
        public int LeftAttack { get; set; }

        /// <summary>
        /// Health.
        /// </summary>
        public int Health { get; set; }

        /// <summary>
        /// Attack.
        /// </summary>
        public int Attack { get; set; }

        /// <summary>
        /// Defence.
        /// </summary>
        public int Defence { get; set; }

        /// <summary>
        /// Total stats.
        /// </summary>
        public int TotalStats { get; set; }

        /// <summary>
        /// Is favourited.
        /// </summary>
        public bool IsFavourited { get; set; }

        /// <summary>
        /// Rarity.
        /// </summary>
        public RarityModel Rarity { get; set; }
    }
}
