using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface ICardCollectionRepository
    {
        Task<CardCollectionData[]> AddCardsAsync(IEnumerable<int> cardIds, int userId, CancellationToken cancellationToken = default);

        Task<SearchResult<CardCollectionData>> FindCardCollectionsAsync(CardCollectionSearchFilter filter, CancellationToken cancellationToken = default);

        Task<CardCollectionData> GetCardCollectionByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
