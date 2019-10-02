using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods for managing turns.
    /// </summary>
    public interface ITurnService
    {
        /// <summary>
        /// Gets a list of turns.
        /// </summary>
        /// <param name="gameId">The game to get turns for.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A list of turns.</returns>
        Task<IEnumerable<TurnModel>> GetTurnsAsync(int gameId, CancellationToken cancellationToken = default);
    }
}
