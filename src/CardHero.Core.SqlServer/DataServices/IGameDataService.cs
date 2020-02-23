using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;

namespace CardHero.Core.SqlServer.DataServices
{
    public interface IGameDataService
    {
        Task<SearchResult<GameModel>> GetGamesAsync(GameSearchFilter filter, int? userId = null, CancellationToken cancellationToken = default);

        Task PopulateGameUsersAsync(GameModel game, int userId, CancellationToken cancellationToken = default);
    }
}
