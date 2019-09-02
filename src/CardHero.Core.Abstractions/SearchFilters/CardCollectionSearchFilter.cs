using System.Collections.Generic;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    public class CardCollectionSearchFilter : SearchFilter<CardCollection>
    {
        /// <summary>
        /// A list of card collection ids to search for.
        /// </summary>
        public IEnumerable<int> Ids { get; set; }
    }
}
