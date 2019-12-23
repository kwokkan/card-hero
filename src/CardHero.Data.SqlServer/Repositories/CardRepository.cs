using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    internal class CardRepository : ICardRepository
    {
        private const int DefaultPageSize = 30;

        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<Card, CardData> _cardMapper;

        public CardRepository(
            CardHeroDataDbContext context,
            IMapper<Card, CardData> cardMapper
        )
        {
            _context = context;

            _cardMapper = cardMapper;
        }

        async Task<SearchResult<CardData>> ICardRepository.FindCardsAsync(CardSearchFilter filter, CancellationToken cancellationToken)
        {
            var query = _context.Card.AsQueryable();

            //TODO: Bring back card favourites
            //if (filter.UserId.HasValue)
            //{
            //    //query = query.Include(x => x.CardFavourite);
            //}

            if (filter.Ids != null)
            {
                query = query.Where(x => filter.Ids.Contains(x.CardPk));
            }

            if (!string.IsNullOrEmpty(filter.Name))
            {
                query = query.Where(x => x.Name.Contains(filter.Name));
            }

            var totalCount = await query.CountAsync(cancellationToken: cancellationToken);

            query = query.OrderBy(x => x.CardPk);

            query = query.Skip(0).Take(filter.PageSize ?? DefaultPageSize);

            query = query.Include(x => x.RarityFkNavigation);

            var results = await query.Select(x => _cardMapper.Map(x)).ToArrayAsync(cancellationToken: cancellationToken);

            var result = new SearchResult<CardData>
            {
                CurrentPage = 0,
                PageSize = DefaultPageSize,
                Results = results,
                TotalCount = totalCount,
            };

            return result;
        }
    }
}
