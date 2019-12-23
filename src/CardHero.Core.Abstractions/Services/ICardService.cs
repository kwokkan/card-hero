using System.Threading;
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
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A list of cards. Unknown ids will not be returned.</returns>
        Task<SearchResult<CardModel>> GetCardsAsync(CardSearchFilter filter, CancellationToken cancellationToken = default);

        /// <summary>
        /// Toggles a favourite for a card.
        /// </summary>
        /// <param name="id">The card id.</param>
        /// <param name="userId">The user id.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>true if the card is favourited otherwise false.</returns>
        Task<bool> ToggleFavouriteAsync(int id, int userId, CancellationToken cancellationToken = default);
    }
}
