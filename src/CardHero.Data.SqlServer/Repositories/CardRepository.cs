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

        private async Task PopulateCardFavouriteAsync(int? userId, CardData[] cards, CancellationToken cancellationToken)
        {
            if (userId.HasValue && cards.Any())
            {
                var cardIds = cards.Select(x => x.Id).ToArray();

                var cardFavourites = await _context
                    .CardFavourite
                    .Where(x => cardIds.Contains(x.CardFk) && x.UserFk == userId.Value)
                    .Select(x => x.CardFk)
                    .ToArrayAsync(cancellationToken: cancellationToken)
                ;

                foreach (var card in cards)
                {
                    card.IsFavourited = cardFavourites.Any(cf => cf == card.Id);
                }
            }
        }

        async Task ICardRepository.FavouriteCardAsync(int id, int userId, bool favourite, CancellationToken cancellationToken)
        {
            var existingFavourite = await _context
                .CardFavourite
                .SingleOrDefaultAsync(x => x.CardFk == id && x.UserFk == userId, cancellationToken: cancellationToken);

            if (favourite && existingFavourite == null)
            {
                var newCardFavourite = new CardFavourite
                {
                    CardFk = id,
                    UserFk = userId,
                };

                _context.CardFavourite.Add(newCardFavourite);

                await _context.SaveChangesAsync(cancellationToken: cancellationToken);
            }
            else if (!favourite && existingFavourite != null)
            {
                _context.CardFavourite.Remove(existingFavourite);

                await _context.SaveChangesAsync(cancellationToken: cancellationToken);
            }
        }

        async Task<SearchResult<CardData>> ICardRepository.FindCardsAsync(CardSearchFilter filter, CancellationToken cancellationToken)
        {
            var query = _context.Card.AsQueryable();

            if (filter.Ids != null)
            {
                query = query.Where(x => filter.Ids.Contains(x.CardPk));
            }

            if (!string.IsNullOrEmpty(filter.Name))
            {
                query = query.Where(x => x.Name.Contains(filter.Name));
            }

            if (filter.CardPackId.HasValue)
            {
                query = query.Where(x => x.CardPackFk == filter.CardPackId.Value);
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

            await PopulateCardFavouriteAsync(filter.UserId, result.Results, cancellationToken);

            return result;
        }
    }
}
