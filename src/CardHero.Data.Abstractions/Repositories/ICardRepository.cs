using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface ICardRepository
    {
        Task<SearchResult<CardData>> FindCardsAsync(CardSearchFilter filter, CancellationToken cancellationToken = default);
    }
}
