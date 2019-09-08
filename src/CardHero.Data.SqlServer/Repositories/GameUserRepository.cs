using System;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Data.Abstractions;

namespace CardHero.Data.SqlServer
{
    internal class GameUserRepository : IGameUserRepository
    {
        public Task<GameUserData> AddGameUserAsync(int gameId, int gameDeckId, CancellationToken cancellationtoken = default)
        {
            throw new NotImplementedException();
        }
    }
}
