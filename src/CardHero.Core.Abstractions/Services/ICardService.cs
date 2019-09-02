using System.Collections.Generic;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods to getting cards.
    /// </summary>
    public interface ICardService
	{
		/// <summary>
		/// Gets a list of cards.
		/// </summary>
		/// <param name="filter">The card filter to use.</param>
		/// <returns>A list of cards. Unknown ids will not be returned.</returns>
		Task<SearchResult<Card>> GetCardsAsync(CardSearchFilter filter);

        /// <summary>
        /// Gets all the cards belonging to a player.
        /// </summary>
        /// <param name="filter">The filter to use.</param>
        /// <returns>A list of cards belonging to a player.</returns>
        Task<SearchResult<CardCollection>> GetCardCollectionAsync(CardCollectionSearchFilter filter);

        /// <summary>
        /// Adds cards to a user's card collection.
        /// </summary>
        /// <param name="cardIds">The card ids to add.</param>
        /// <param name="userId">The user too add to.</param>
        /// <returns>A list of card collections.</returns>
        Task<IEnumerable<CardCollection>> AddCardsToCardCollectionAsync(IEnumerable<int> cardIds, int userId);

        /// <summary>
        /// Toggles a favourite for a card.
        /// </summary>
        /// <param name="id">The card id.</param>
        /// <param name="userId">The user id.</param>
        /// <returns>true if the card is favourited otherwise false.</returns>
        Task<bool> ToggleFavouriteAsync(int id, int userId);
	}
}
