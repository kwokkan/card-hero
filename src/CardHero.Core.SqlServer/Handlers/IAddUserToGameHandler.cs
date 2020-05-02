using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Core.SqlServer.Handlers
{
    public interface IAddUserToGameHandler
    {
        Task HandleAsync(int id, int userId, int deckId, CancellationToken cancellationToken = default);
    }
}
