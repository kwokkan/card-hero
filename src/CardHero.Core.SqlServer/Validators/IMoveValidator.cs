using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.SqlServer
{
    public interface IMoveValidator
    {
        Task ValidateMoveAsync(MoveModel move, GameModel game, CancellationToken cancellationToken = default);
    }
}
