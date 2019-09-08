using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    public class GameDeckRepository : IGameDeckRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        public GameDeckRepository(ICardHeroDataDbContextFactory factory)
        {
            _factory = factory;
        }

        public async Task<GameDeckData> AddGameDeckAsync(int gameUserId, string name, string description, int[] cardIds, CancellationToken cancellationToken = default)
        {
            var gameDeck = new GameDeck
            {
                CreatedTime = DateTime.UtcNow,
                Description = description,
                GameUserFk = gameUserId,
                Name = name,
            };

            if (cardIds != null)
            {
                gameDeck.GameDeckCardCollection = cardIds.Select(x => new GameDeckCardCollection
                {
                    CardFk = x,
                }).ToArray();
            }

            using (var context = _factory.Create(trackChanges: true))
            {
                context.GameDeck.Add(gameDeck);

                await context.SaveChangesAsync(cancellationToken: cancellationToken);
            }

            var data = new GameDeckData
            {
                CreatedTime = gameDeck.CreatedTime,
                Description = description,
                GameUserId = gameUserId,
                Id = gameDeck.GameDeckPk,
                Name = name,
            };

            return data;
        }
    }
}
