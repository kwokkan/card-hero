using System;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameUserMapper : IMapper<GameUser, GameUserData>
    {
        public GameUserData Map(GameUser from)
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

        public GameUser Map(GameUserData from)
        {
            throw new NotImplementedException();
        }
    }
}
