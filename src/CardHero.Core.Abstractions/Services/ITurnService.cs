using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        /// <returns>A list of turns.</returns>
        Task<IEnumerable<Turn>> GetTurnsAsync(int gameId);
    }
}
