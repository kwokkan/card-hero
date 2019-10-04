﻿using System;
using System.Threading;
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
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A new Game object.</returns>
        /// <exception cref="ArgumentException">When there are no users starting the game.</exception>
        /// <exception cref="ArgumentNullException"><paramref name="game"/> is null.</exception>
        Task<GameModel> CreateGameAsync(GameCreateModel game, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets a game by id.
        /// </summary>
        /// <param name="id">The game id</param>
        /// <param name="userId">The user id.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>The game.</returns>
        Task<GameModel> GetGameByIdAsync(int id, int? userId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets a list of games.
        /// </summary>
        /// <param name="filter">The game filter to use.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A list of games.</returns>
        Task<SearchResult<GameModel>> GetGamesAsync(GameSearchFilter filter, CancellationToken cancellationToken = default);
    }
}
