using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.SqlServer.Services
{
    public class CardPackService : BaseService, ICardPackService
    {
        private readonly ICardPackRepository _cardPackRepository;

        public CardPackService(
            ICardPackRepository cardPackRepository
        )
        {
            _cardPackRepository = cardPackRepository;
        }

        async Task<Abstractions.SearchResult<CardPackModel>> ICardPackService.GetCardPacksAsync(CancellationToken cancellationToken)
        {
            var cardCollections = await _cardPackRepository.FindCardPacksAsync(cancellationToken: cancellationToken);

            var results = cardCollections.Results;

            return new Abstractions.SearchResult<CardPackModel>
            {
                Count = cardCollections.TotalCount,
                Results = results,
            };
        }
    }
}
