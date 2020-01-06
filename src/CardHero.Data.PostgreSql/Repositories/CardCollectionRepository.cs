using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.PostgreSql
{
    internal class CardCollectionRepository : ICardCollectionRepository
    {
        private const int DefaultPageSize = 30;

        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<CardCollection, CardCollectionData> _cardCollectionMapper;

        public CardCollectionRepository(
            CardHeroDataDbContext context,
            IMapper<CardCollection, CardCollectionData> cardCollectionMapper
        )
        {
            _context = context;

            _cardCollectionMapper = cardCollectionMapper;
        }

        async Task<CardCollectionData[]> ICardCollectionRepository.AddCardsAsync(IEnumerable<int> cardIds, int userId, CancellationToken cancellationToken)
        {
            if (cardIds == null)
            {
                return null;
            }

            if (!cardIds.Any())
            {
                return Array.Empty<CardCollectionData>();
            }

            var cardCollections = cardIds
                .Select(x => new CardCollection
                {
                    CardFk = x,
                    CreatedTime = DateTime.UtcNow,
                    UserFk = userId,
                })
                .ToArray();

            await _context.CardCollection.AddRangeAsync(cardCollections);

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            var results = cardCollections.Select(x => _cardCollectionMapper.Map(x)).ToArray();

            return results;
        }

        async Task<SearchResult<CardCollectionData>> ICardCollectionRepository.FindCardCollectionsAsync(CardCollectionSearchFilter filter, CancellationToken cancellationToken)
        {
            var query = _context.CardCollection
                .AsQueryable();

            if (!string.IsNullOrEmpty(filter.CardName))
            {
                query = query.Include(x => x.CardFkNavigation);
                query = query.Where(x => x.CardFkNavigation.Name.Contains(filter.CardName));
            }

            if (filter.Ids != null && filter.Ids.Any())
            {
                query = query.Where(x => filter.Ids.Contains(x.CardCollectionPk));
            }

            if (filter.UserId.HasValue)
            {
                query = query.Where(x => x.UserFk == filter.UserId.Value);
            }

            var totalCount = await query.CountAsync(cancellationToken: cancellationToken);

            query = query.OrderBy(x => x.CardCollectionPk);

            query = query.Skip(0).Take(DefaultPageSize);

            var results = await query.Select(x => _cardCollectionMapper.Map(x)).ToArrayAsync(cancellationToken: cancellationToken);

            var result = new SearchResult<CardCollectionData>
            {
                CurrentPage = 0,
                PageSize = DefaultPageSize,
                Results = results,
                TotalCount = totalCount,
            };

            return result;
        }

        async Task<CardCollectionData> ICardCollectionRepository.GetCardCollectionByIdAsync(int id, CancellationToken cancellationToken)
        {
            var deck = await _context
                .CardCollection
                .Where(x => x.CardCollectionPk == id)
                .Select(x => _cardCollectionMapper.Map(x))
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            return deck;
        }
    }
}
