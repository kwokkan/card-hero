using System;
using System.Linq.Expressions;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameUserMapper : IMapper<GameUser, GameUserData>
    {
        Expression<Func<GameUser, GameUserData>> IMapper<GameUser, GameUserData>.Map
        {
            get
            {
                return source => new GameUserData
                {
                    //GameDeckId = source.
                    Id = source.GameUserPk,
                    //JoinedTime = source.c,
                    UserId = source.UserFk,
                    Order = source.Order,
                };
            }
        }
    }
}
