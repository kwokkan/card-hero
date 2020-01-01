using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

using Microsoft.EntityFrameworkCore;

namespace CardHero.Data.PostgreSql
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

            _context.GameDeck.Add(gameDeck);

            await _context.SaveChangesAsync(cancellationToken: cancellationToken);

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
            var gameDeck = await _context
                .GameDeck
                .Where(x => x.GameUserFk == gameUserId)
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
