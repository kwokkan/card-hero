using System;

namespace CardHero.Core.Models
{
    /// <summary>
    /// User.
    /// </summary>
    public class User : ICardHeroEntity
    {
        /// <summary>
        /// Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identifier.
        /// </summary>
        public string Identifier { get; set; }

        /// <summary>
        /// Created date.
        /// </summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Full name.
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Identity provider source.
        /// </summary>
        public string IdPsource { get; set; }

        /// <summary>
        /// Coins this user has.
        /// </summary>
        public long Coins { get; set; }
    }
}
