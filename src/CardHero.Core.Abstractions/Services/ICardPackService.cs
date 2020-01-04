using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods to getting card packs.
    /// </summary>
    public interface ICardPackService
    {
        /// <summary>
        /// Gets a list of card packs.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A list of card packs.</returns>
        Task<SearchResult<CardPackModel>> GetCardPacksAsync(CancellationToken cancellationToken = default);
    }
}
