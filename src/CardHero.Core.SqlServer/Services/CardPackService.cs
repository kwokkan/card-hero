using System.Linq;
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

        private readonly IDataMapper<CardPackData, CardPackModel> _cardPackDataMapper;

        public CardPackService(
            ICardPackRepository cardPackRepository,
            IDataMapper<CardPackData, CardPackModel> cardPackDataMapper
        )
        {
            _cardPackRepository = cardPackRepository;

            _cardPackDataMapper = cardPackDataMapper;
        }

        async Task<Abstractions.SearchResult<CardPackModel>> ICardPackService.GetCardPacksAsync(CancellationToken cancellationToken)
        {
            var cardCollections = await _cardPackRepository.FindCardPacksAsync(cancellationToken: cancellationToken);

            var results = cardCollections.Results.Select(_cardPackDataMapper.Map).ToArray();

            return new Abstractions.SearchResult<CardPackModel>
            {
                Count = cardCollections.TotalCount,
                Results = results,
            };
        }
    }
}
