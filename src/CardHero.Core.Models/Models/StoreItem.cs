using System;
using System.Collections.Generic;

namespace CardHero.Core.Models
{
    /// <summary>
    /// Store item.
    /// </summary>
    public class StoreItem : ICardHeroEntity
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
        /// Cost.
        /// </summary>
        public int Cost { get; set; }

        /// <summary>
        /// Item count.
        /// </summary>
        public int ItemCount { get; set; }

        /// <summary>
        /// Expiry.
        /// </summary>
        public DateTime? Expiry { get; set; }
    }
}
