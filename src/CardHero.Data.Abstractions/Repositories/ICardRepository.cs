using System.Threading;
using System.Threading.Tasks;

namespace CardHero.Data.Abstractions
{
    public interface ICardRepository
    {
        Task FavouriteCardAsync(int id, int userId, bool favourite, CancellationToken cancellationToken = default);

        Task<SearchResult<CardData>> FindCardsAsync(CardSearchFilter filter, CancellationToken cancellationToken = default);
    }
}
