using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods for querying moves.
    /// </summary>
    public interface IMoveService
    {
        /// <summary>
        /// Gets a list of moves.
        /// </summary>
        /// <param name="gameId">The game to get moves for.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A list of moves.</returns>
        Task<IEnumerable<MoveModel>> GetMovesAsync(int gameId, CancellationToken cancellationToken = default);
    }
}
