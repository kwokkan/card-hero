using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        /// <returns>A list of moves.</returns>
        Task<IEnumerable<Move>> GetMovesAsync(int gameId);
    }
}
