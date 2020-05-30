using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;

namespace CardHero.Data.Abstractions
{
    public interface ICardRepository
    {
        Task FavouriteCardAsync(int id, int userId, bool favourite, CancellationToken cancellationToken = default);

        Task<SearchResult<CardModel>> FindCardsAsync(CardSearchFilter filter, CancellationToken cancellationToken = default);
    }
}
