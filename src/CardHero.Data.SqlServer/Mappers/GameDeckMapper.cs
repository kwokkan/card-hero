using System;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameDeckMapper : IMapper<GameDeck, GameDeckData>
    {
        public GameDeckData Map(GameDeck from)
        {
            return new GameDeckData
            {
                CreatedTime = from.CreatedTime,
                Description = from.Description,
                GameUserId = from.GameUserFk,
                Id = from.GameDeckPk,
                Name = from.Name,
            };
        }

        public GameDeck Map(GameDeckData from)
        {
            throw new NotImplementedException();
        }
    }
}
