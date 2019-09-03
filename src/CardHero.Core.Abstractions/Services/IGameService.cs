using System;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods for playing a game.
    /// </summary>
    public interface IGameService
    {
        /// <summary>
        /// Starts a new game with the required users.
        /// </summary>
        /// <param name="game">The game to create.</param>
        /// <returns>A new Game object.</returns>
        /// <exception cref="ArgumentException">When there are no users starting the game.</exception>
        /// <exception cref="ArgumentNullException"><paramref name="game"/> is null.</exception>
        Task<Game> CreateGameAsync(Game game);

        /// <summary>
        /// Gets a list of games.
        /// </summary>
        /// <param name="filter">The game filter to use.</param>
        /// <returns>A list of games.</returns>
        Task<SearchResult<Game>> GetGamesAsync(GameSearchFilter filter);
    }
}
