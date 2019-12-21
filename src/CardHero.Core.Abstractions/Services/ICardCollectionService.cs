using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods to getting cards.
    /// </summary>
    public interface ICardCollectionService
    {
        /// <summary>
        /// Gets all the cards belonging to a player.
        /// </summary>
        /// <param name="filter">The filter to use.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A list of cards belonging to a player.</returns>
        Task<SearchResult<CardCollectionModel>> GetCardCollectionAsync(CardCollectionSearchFilter filter, CancellationToken cancellationToken = default);

        /// <summary>
        /// Adds cards to a user's card collection.
        /// </summary>
        /// <param name="cardIds">The card ids to add.</param>
        /// <param name="userId">The user too add to.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A list of card collections.</returns>
        Task<CardCollectionModel[]> AddCardsToCardCollectionAsync(IEnumerable<int> cardIds, int userId, CancellationToken cancellationToken = default);
    }
}
