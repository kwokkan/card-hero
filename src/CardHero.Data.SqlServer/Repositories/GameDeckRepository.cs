using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    public class GameDeckRepository : IGameDeckRepository
    {
        private readonly ICardHeroDataDbContextFactory _factory;

        private readonly IMapper<GameDeck, GameDeckData> _gameDeckMapper;

        public GameDeckRepository(
            ICardHeroDataDbContextFactory factory,
            IMapper<GameDeck, GameDeckData> gameDeckMapper
        )
        {
            _factory = factory;

            _gameDeckMapper = gameDeckMapper;
        }

        async Task<GameDeckData> IGameDeckRepository.AddGameDeckAsync(int gameUserId, string name, string description, int[] cardIds, CancellationToken cancellationToken)
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

        async Task<GameDeckData> IGameDeckRepository.GetGameDeckByGameUserIdAsync(int gameUserId, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var gameDeck = await context
                    .GameDeck
                    .Where(x => x.GameUserFk == gameUserId)
                    .Select(x => _gameDeckMapper.Map(x))
                    .FirstOrDefaultAsync(cancellationToken: cancellationToken);

                return gameDeck;
            }
        }

        async Task<GameDeckCardCollectionData[]> IGameDeckRepository.GetGameDeckCardCollectionAsync(int gameDeckId, CancellationToken cancellationToken)
        {
            using (var context = _factory.Create())
            {
                var deckCards = await context
                    .GameDeckCardCollection
                    .Where(x => x.GameDeckFk == gameDeckId)
                    .Select(x => new GameDeckCardCollectionData
                    {
                        CardId = x.CardFk,
                        GameDeckId = gameDeckId,
                        Id = x.GameDeckCardCollectionPk,
                    })
                    .ToArrayAsync(cancellationToken: cancellationToken)
                ;

                return deckCards;
            }
        }
    }
}
