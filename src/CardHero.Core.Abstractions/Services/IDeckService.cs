using System.Collections.Generic;
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
        /// <returns></returns>
        Task<SearchResult<Deck>> GetDecksAsync(DeckSearchFilter filter);

        /// <summary>
        /// Gets a deck by id.
        /// </summary>
        /// <param name="id">The id of the deck.</param>
        /// <returns></returns>
        Task<Deck> GetDeckByIdAsync(int id);

        /// <summary>
        /// Creates a new deck.
        /// </summary>
        /// <param name="deck">The deck to create.</param>
        /// <param name="userId">The user to create the deck for.</param>
        /// <returns></returns>
        Task<Deck> CreateDeckAsync(Deck deck, int userId);

        /// <summary>
        /// Updates a deck.
        /// </summary>
        /// <param name="deckId">The deck tp update.</param>
        /// <param name="deck">The updated deck.</param>
        /// <returns></returns>
        Task UpdateDeckAsync(int deckId, Deck deck);

        /// <summary>
        /// Toggles a favourite for a deck.
        /// </summary>
        /// <param name="id">The deck id.</param>
        /// <param name="userId">The user id.</param>
        /// <returns>true if the deck is favourited otherwise false.</returns>
        bool ToggleFavourite(int id, int userId);

        /// <summary>
        /// Updates the cards in a collection.
        /// </summary>
        /// <param name="id">The deck id.</param>
        /// <param name="userId">The user id.</param>
        /// <param name="cardCollectionIds">The card collection ids.</param>
        void UpdateCollection(int id, int userId, IEnumerable<int> cardCollectionIds);
    }
}
