using System;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

namespace CardHero.Data.PostgreSql
{
    internal class GameUserMapper : IMapper<GameUser, GameUserData>
    {
        GameUserData IMapper<GameUser, GameUserData>.Map(GameUser from)
        {
            return new GameUserData
            {
                //GameDeckId = source.
                Id = from.GameUserPk,
                //JoinedTime = source.c,
                UserId = from.UserFk,
                Order = from.Order,
            };
        }

        GameUser IMapper<GameUser, GameUserData>.Map(GameUserData from)
        {
            throw new NotImplementedException();
        }
    }
}
