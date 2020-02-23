using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.SqlServer
{
    public interface IGameValidator
    {
        Task<GameModel> ValidateGameForMoveAsync(int id, int userId, CancellationToken cancellationToken = default);

        Task ValidateNewGameAsync(GameCreateModel game, CancellationToken cancellationToken = default);
    }
}
