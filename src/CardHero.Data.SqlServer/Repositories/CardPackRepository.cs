using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    internal class CardPackRepository : ICardPackRepository
    {
        private const int DefaultPageSize = 30;

        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<CardPack, CardPackModel> _cardPackMapper;

        public CardPackRepository(
            CardHeroDataDbContext context,
            IMapper<CardPack, CardPackModel> cardPackMapper
        )
        {
            _context = context;

            _cardPackMapper = cardPackMapper;
        }

        async Task<SearchResult<CardPackModel>> ICardPackRepository.FindCardPacksAsync(CancellationToken cancellationToken)
        {
            var query = _context.CardPack.AsQueryable();

            var totalCount = await query.CountAsync(cancellationToken: cancellationToken);

            query = query.OrderBy(x => x.CardPackPk);

            query = query.Skip(0).Take(DefaultPageSize);

            var results = await query.Select(x => _cardPackMapper.Map(x)).ToArrayAsync(cancellationToken: cancellationToken);

            var result = new SearchResult<CardPackModel>
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
