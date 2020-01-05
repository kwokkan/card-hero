using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.PostgreSql
{
    internal class CardPackRepository : ICardPackRepository
    {
        private const int DefaultPageSize = 30;

        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<CardPack, CardPackData> _cardPackMapper;

        public CardPackRepository(
            CardHeroDataDbContext context,
            IMapper<CardPack, CardPackData> cardPackMapper
        )
        {
            _context = context;

            _cardPackMapper = cardPackMapper;
        }

        async Task<SearchResult<CardPackData>> ICardPackRepository.FindCardPacksAsync(CancellationToken cancellationToken)
        {
            var query = _context.CardPack.AsQueryable();

            var totalCount = await query.CountAsync(cancellationToken: cancellationToken);

            query = query.OrderBy(x => x.CardPackPk);

            query = query.Skip(0).Take(DefaultPageSize);

            var results = await query.Select(x => _cardPackMapper.Map(x)).ToArrayAsync(cancellationToken: cancellationToken);

            var result = new SearchResult<CardPackData>
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
