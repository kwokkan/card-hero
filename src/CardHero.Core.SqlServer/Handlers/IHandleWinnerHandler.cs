using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Core.SqlServer.Handlers
{
    public interface IHandleWinnerHandler
    {
        Task HandleAsync(int gameId, IEnumerable<int> userIds, CancellationToken cancellationToken = default);
    }
}
