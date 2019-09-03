using System.Collections.Generic;
using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Base class for all searches.
    /// </summary>
    public class SearchResult<T>
        where T : ICardHeroEntity
    {
        /// <summary>
        /// Total count of all results.
        /// </summary>
        public int Count { get; set; }

        /// <summary>
        /// List of results returned.
        /// </summary>
        public IEnumerable<T> Results { get; set; }
    }
}
