using System;
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

        public Task<GameDeckData> AddGameDeckAsync(int gameId, int deckId, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
