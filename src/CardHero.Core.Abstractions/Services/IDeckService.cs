using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods for managing decks.
    /// </summary>
    public interface IDeckService
    {
        /// <summary>
        /// Gets a list of all decks belonging to the current user.
        /// </summary>
        /// <param name="filter">The filter to use.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns></returns>
        Task<SearchResult<DeckModel>> GetDecksAsync(DeckSearchFilter filter, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets a deck by id.
        /// </summary>
        /// <param name="id">The id of the deck.</param>
        /// <param name="userId">The user id.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns></returns>
        Task<DeckModel> GetDeckByIdAsync(int id, int userId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a new deck.
        /// </summary>
        /// <param name="deck">The deck to create.</param>
        /// <param name="userId">The user to create the deck for.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns></returns>
        Task<DeckModel> CreateDeckAsync(DeckCreateModel deck, int userId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Updates a deck.
        /// </summary>
        /// <param name="deckId">The deck tp update.</param>
        /// <param name="deck">The updated deck.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns></returns>
        Task UpdateDeckAsync(int deckId, DeckModel deck, CancellationToken cancellationToken = default);

        /// <summary>
        /// Favourites a deck.
        /// </summary>
        /// <param name="id">The deck id.</param>
        /// <param name="userId">The user id.</param>
        /// <param name="favourite">true to favourite, false to not.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>The task.</returns>
        Task FavouriteDeckAsync(int id, int userId, bool favourite, CancellationToken cancellationToken = default);

        /// <summary>
        /// Updates the cards in a collection.
        /// </summary>
        /// <param name="id">The deck id.</param>
        /// <param name="userId">The user id.</param>
        /// <param name="cardCollectionIds">The card collection ids.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task UpdateCollectionAsync(int id, int userId, IEnumerable<int> cardCollectionIds, CancellationToken cancellationToken = default);
    }
}
