using System.Collections.Generic;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    public class CardCollectionSearchFilter : SearchFilter<CardCollectionModel>
    {
        /// <summary>
        /// Name of card to search for.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// A list of card collection ids to search for.
        /// </summary>
        public IEnumerable<int> Ids { get; set; }
    }
}
