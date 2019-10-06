using System;
using System.Linq.Expressions;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameDeckMapper : IMapper<GameDeck, GameDeckData>
    {
        Expression<Func<GameDeck, GameDeckData>> IMapper<GameDeck, GameDeckData>.Map
        {
            get
            {
                throw new NotImplementedException();
            }
        }
    }
}
