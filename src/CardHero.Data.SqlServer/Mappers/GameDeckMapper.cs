using System;
using System.Collections.Generic;
using System.Text;
using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameDeckMapper : IMapper<GameDeck, GameDeckData>
    {
        public GameDeckData Map(GameDeck from)
        {
            throw new NotImplementedException();
        }

        public GameDeck Map(GameDeckData from)
        {
            throw new NotImplementedException();
        }
    }
}
