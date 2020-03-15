using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Defines methods for populating users on moves.
    /// </summary>
    public interface IMoveUserService
    {
        /// <summary>
        /// Populates a list of moves with the user id.
        /// </summary>
        /// <param name="moves">Moves to populate.</param>
        /// <param name="cards">Cards to use to populate.</param>
        /// <param name="userIds">User ids to use. Must be sorted in order they have turns.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>A list of moves with the users populated.</returns>
        Task<IEnumerable<MoveModel>> PopulateMoveUsersAsync(IEnumerable<MoveModel> moves, IEnumerable<CardModel> cards, IEnumerable<int> userIds, CancellationToken cancellationToken = default);
    }
}
