using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface ICardPackRepository
    {
        Task<SearchResult<CardPackData>> FindCardPacksAsync(CancellationToken cancellationToken = default);
    }
}
