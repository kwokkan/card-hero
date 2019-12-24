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
    public class CardService : BaseService, ICardService
    {
        private readonly ICardRepository _cardRepository;

        private readonly IDataMapper<CardData, CardModel> _cardDataMapper;

        public CardService(
            IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory,
            ICardRepository cardRepository,
            IDataMapper<CardData, CardModel> cardDataMapper
        )
            : base(contextFactory)
        {
            _cardRepository = cardRepository;

            _cardDataMapper = cardDataMapper;
        }

        async Task<Abstractions.SearchResult<CardModel>> ICardService.GetCardsAsync(Abstractions.CardSearchFilter filter, CancellationToken cancellationToken)
        {
            var cardCollections = await _cardRepository.FindCardsAsync(
                new Data.Abstractions.CardSearchFilter
                {
                    Ids = filter.Ids?.ToArray(),
                    Name = filter.Name,
                    UserId = filter.UserId,
                },
                cancellationToken: cancellationToken
            );

            var results = cardCollections.Results.Select(_cardDataMapper.Map).ToArray();

            return new Abstractions.SearchResult<CardModel>
            {
                Count = cardCollections.TotalCount,
                Results = results,
            };
        }

        async Task<bool> ICardService.ToggleFavouriteAsync(int id, int userId, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var favourite = await context
                .CardFavourite
                .SingleOrDefaultAsync(x => x.CardFk == id && x.UserFk == userId, cancellationToken: cancellationToken);

            if (favourite == null)
            {
                var newCardFavourite = new CardFavourite
                {
                    CardFk = id,
                    UserFk = userId,
                };

                context.CardFavourite.Add(newCardFavourite);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                return true;
            }
            else
            {
                context.CardFavourite.Remove(favourite);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);

                return false;
            }
        }
    }
}
