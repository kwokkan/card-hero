using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Data.Abstractions
{
    public interface ICardPackRepository
    {
        Task<SearchResult<CardPackModel>> FindCardPacksAsync(CancellationToken cancellationToken = default);
    }
}
