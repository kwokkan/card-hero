using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public class CardService : BaseService, ICardService
    {
        public CardService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
            : base(contextFactory)
        {
        }

        Task<SearchResult<CardModel>> ICardService.GetCardsAsync(CardSearchFilter filter, CancellationToken cancellationToken)
        {
            var context = GetContext();

            var query = context.Card.AsQueryable();

            if (filter.UserId.HasValue)
            {
                query = query.Include(x => x.CardFavourite);
            }

            if (filter.Ids != null)
            {
                query = query.Where(x => filter.Ids.Contains(x.CardPk));
            }

            if (!string.IsNullOrEmpty(filter.Name))
            {
                query = query.Where(x => x.Name.Contains(filter.Name));
            }

            return PaginateAndSortAsync(query, filter, x => x.ToCore(filter.UserId), cancellationToken: cancellationToken);
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
