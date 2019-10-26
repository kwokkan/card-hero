using System.Collections.ObjectModel;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface IGameDeckCardCollectionRepository
    {
        Task<ReadOnlyCollection<GameDeckCardCollectionData>> SearchAsync(
            GameDeckCardCollectionSearchFilter filter,
            CancellationToken cancellationToken = default
        );
    }
}
