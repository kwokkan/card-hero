using System.Collections.Generic;
using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Filter for searching decks.
    /// </summary>
    public class DeckSearchFilter : SearchFilter<Deck>
    {
        /// <summary>
        /// A list of deck ids to search for.
        /// </summary>
        public IEnumerable<int> Ids { get; set; }

        /// <summary>
        /// Name to search for.
        /// </summary>
        public string Name { get; set; }
    }
}
