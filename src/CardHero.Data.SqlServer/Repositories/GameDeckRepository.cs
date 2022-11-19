using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.SqlServer
{
    internal class GameDeckRepository : IGameDeckRepository
    {
        private readonly CardHeroDataDbContext _context;

        private readonly IMapper<GameDeck, GameDeckData> _gameDeckMapper;

        public GameDeckRepository(
            CardHeroDataDbContext context,
            IMapper<GameDeck, GameDeckData> gameDeckMapper
        )
        {
            _context = context;

            _gameDeckMapper = gameDeckMapper;
        }

        async Task<GameDeckData> IGameDeckRepository.AddGameDeckAsync(int gameId, int userId, string name, string description, int[] cardIds, CancellationToken cancellationToken)
        {
            var gameUser = new GameUser
            {
                GameFk = gameId,
                JoinedTime = DateTime.UtcNow,
                UserFk = userId,
            };

            var gameDeck = new GameDeck
            {
                CreatedTime = DateTime.UtcNow,
                Description = description,
                GameUserFkNavigation = gameUser,
                Name = name,
            };

            if (cardIds != null)
            {
                foreach (var cardId in cardIds)
                {
                    gameDeck.GameDeckCardCollection.Add(new GameDeckCardCollection
                    {
                        CardFk = cardId,
                    });
                }
            }

            _context.GameDeck.Add(gameDeck);

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

            var data = new GameDeckData
            {
                CreatedTime = gameDeck.CreatedTime,
                Description = description,
                GameUserId = gameUser.GameUserPk,
                Id = gameDeck.GameDeckPk,
                Name = name,
            };

            return data;
        }

        async Task<GameDeckData> IGameDeckRepository.GetGameDeckByGameAndUserIdAsync(int gameId, int userId, CancellationToken cancellationToken)
        {
            var gameDeck = await _context
                .GameUser
                .Where(x => x.GameFk == gameId && x.UserFk == userId)
                .SelectMany(x => x.GameDeck)
                .Select(x => _gameDeckMapper.Map(x))
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            return gameDeck;
        }

        async Task<GameDeckCardCollectionData[]> IGameDeckRepository.GetGameDeckCardCollectionAsync(int gameDeckId, CancellationToken cancellationToken)
        {
            var deckCards = await _context
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
