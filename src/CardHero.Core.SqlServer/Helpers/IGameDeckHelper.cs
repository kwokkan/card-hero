using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Core.SqlServer.Helpers
{
    public interface IGameDeckHelper
    {
        Task PopulateDeckAsync(int? userId, GameModel game, GamePlayModel gamePlay, CancellationToken cancellationToken = default);
    }
}
