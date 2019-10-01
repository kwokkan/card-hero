using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods for playing a game.
    /// </summary>
    public interface IGamePlayService
    {
        /// <summary>
        /// Makes a move on a game.
        /// </summary>
        /// <remarks>
        /// The following should be checked in this order:
        ///  - Player
        ///  - Game
        ///  - Turn
        ///  - Card
        ///  - Grid
        /// </remarks>
        /// <param name="move">The move.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <exception cref="InvalidCardException">The card played does not belong to the player or it has already been used in this game.</exception>
        /// <exception cref="InvalidGameException">The game is currently not played by the player or is invalid.</exception>
        /// <exception cref="InvalidMoveException">The move is out of bounds of the grid.</exception>
        /// <exception cref="InvalidPlayerException">The player is invalid.</exception>
        /// <exception cref="InvalidTurnException">The current game turn does not belong to the player.</exception>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        Task MakeMoveAsync(MoveModel move, CancellationToken cancellationToken = default);
    }
}
