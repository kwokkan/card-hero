using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;
using CardHero.Data.Abstractions;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class CardCollectionService : BaseService, ICardCollectionService
    {
        private readonly ICardCollectionRepository _cardCollectionRepository;

        private readonly IDataMapper<CardCollectionData, CardCollectionModel> _cardCollectionDataMapper;

        public CardCollectionService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            ICardCollectionRepository cardCollectionRepository,
            IDataMapper<CardCollectionData, CardCollectionModel> cardCollectionDataMapper
        )
            : base(contextFactory)
        {
            _cardCollectionRepository = cardCollectionRepository;

            _cardCollectionDataMapper = cardCollectionDataMapper;
        }

        private async Task<Abstractions.SearchResult<CardCollectionModel>> GetCardCollectionInternalAsync(Abstractions.CardCollectionSearchFilter filter, CancellationToken cancellationToken)
        {
            var cardCollections = await _cardCollectionRepository.FindCardCollectionsAsync(
                new Data.Abstractions.CardCollectionSearchFilter
                {
                    CardName = filter.Name,
                    Ids = filter.Ids?.ToArray(),
                    UserId = filter.UserId,
                },
                cancellationToken: cancellationToken
            );

            var results = cardCollections.Results.Select(_cardCollectionDataMapper.Map).ToArray();

            var cardIds = results.Select(x => x.CardId).ToArray();

            //TODO: Replace with card repository
            using (var context = GetContext())
            {
                var query = context.Card.AsQueryable();

                query = query.Where(x => cardIds.Contains(x.CardPk));

                var cards = await query.Select(x => x.ToCore(filter.UserId)).ToListAsync();

                foreach (var res in results)
                {
                    res.Card = cards.FirstOrDefault(x => x.Id == res.CardId);
                }
            }

            return new Abstractions.SearchResult<CardCollectionModel>
            {
                Count = cardCollections.TotalCount,
                Results = results,
            };
        }

        async Task<CardCollectionModel[]> ICardCollectionService.AddCardsToCardCollectionAsync(IEnumerable<int> cardIds, int userId, CancellationToken cancellationToken)
        {
            if (cardIds == null)
            {
                return null;
            }

            var cardCollections = await _cardCollectionRepository.AddCardsAsync(cardIds, userId, cancellationToken: cancellationToken);

            var cardCollectionIds = cardCollections.Select(x => x.Id).ToArray();
            var searchResult = await GetCardCollectionInternalAsync(new Abstractions.CardCollectionSearchFilter { Ids = cardCollectionIds }, cancellationToken: cancellationToken);

            return searchResult.Results;
        }

        Task<Abstractions.SearchResult<CardCollectionModel>> ICardCollectionService.GetCardCollectionAsync(Abstractions.CardCollectionSearchFilter filter, CancellationToken cancellationToken)
        {
            return GetCardCollectionInternalAsync(filter, cancellationToken);
        }
    }
}
