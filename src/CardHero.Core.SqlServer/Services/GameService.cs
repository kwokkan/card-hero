using System;
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
    public class GameService : BaseService, IGameService
    {
        public GameService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
            : base(contextFactory)
        {
        }

        public async Task<GameModel> CreateGameAsync(GameCreateModel game, CancellationToken cancellationToken = default)
        {
            if (game == null)
            {
                throw new ArgumentNullException(nameof(game));
            }

            if (game.Users == null || !game.Users.Any())
            {
                throw new ArgumentException("There must be at least 1 user.");
            }

            if (game.DeckId <= 0)
            {
                throw new ArgumentException("There must be a deck to play.");
            }

            var context = GetContext();

            var deck = await context.Deck.FirstOrDefaultAsync(x => x.DeckPk == game.DeckId, cancellationToken: cancellationToken);

            //TODO: Do actual validation on the deck to make sure it belongs to the user
            //var myUserId = 0;
            //if (deck == null || deck.UserFk != myUserId)
            //    throw new InvalidDeckException("The selected deck is invalid.");

            var users = game.Users.ToList();
            var currentUserId = new Random().Next(0, users.Count());
            var newGame = new Game
            {
                CurrentUserFk = users[currentUserId].Id,
                DeckFk = game.DeckId,
                GameUser = users.Select(x => new GameUser
                {
                    UserFk = x.Id,
                }).ToList(),
                GameTypeFk = (int)game.Type,
                Name = game.Name,
            };

            newGame.Turn.Add(new Turn
            {
                CurrentUserFk = users[currentUserId].Id,
                StartTime = DateTime.UtcNow,
            });

            context.Add(newGame);
            await context.SaveChangesAsync(cancellationToken: cancellationToken);

            var filter = new GameSearchFilter
            {
                GameId = newGame.GamePk,
            };
            var result = (await GetGamesAsync(filter, cancellationToken: cancellationToken)).Results.FirstOrDefault();

            return result;
        }

        public Task<SearchResult<GameModel>> GetGamesAsync(GameSearchFilter filter, CancellationToken cancellationToken = default)
        {
            var result = new SearchResult<GameModel>();

            var context = GetContext();

            var query = context.Game
                .Include(x => x.CurrentUserFkNavigation)
                .Include(x => x.DeckFkNavigation)
                    .ThenInclude(x => x.DeckCardCollection)
                        .ThenInclude(x => x.CardCollectionFkNavigation)
                            .ThenInclude(x => x.CardFkNavigation)
                .Include(x => x.GameUser)
                    .ThenInclude(x => x.GameFkNavigation)
                .Include(x => x.GameUser)
                    .ThenInclude(x => x.UserFkNavigation)
                .Include(x => x.WinnerFkNavigation)
                .AsQueryable();

            if (filter.GameId.HasValue)
            {
                query = query.Where(x => x.GamePk == filter.GameId.Value);
            }

            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                query = query.Where(x => x.Name.Contains(filter.Name));
            }

            if (filter.StartTime.HasValue)
            {
                query = query.Where(x => x.StartTime >= filter.StartTime.Value);
            }

            if (filter.EndTime.HasValue)
            {
                query = query.Where(x => x.EndTime <= filter.EndTime.Value);
            }

            if (filter.ActiveOnly)
            {
                query = query.Where(x => !x.EndTime.HasValue);
            }

            if (filter.Type.HasValue)
            {
                query = query.Where(x => x.GameTypeFk == (int)filter.Type.Value);
            }

            return PaginateAndSortAsync(query, filter, x => x.ToCore(), cancellationToken: cancellationToken);
        }
    }
}
