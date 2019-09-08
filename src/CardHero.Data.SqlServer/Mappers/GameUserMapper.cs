using System;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameUserMapper : IMapper<GameUser, GameUserData>
    {
        public GameUserData Map(GameUser source)
        {
            return new GameUserData
            {
                //GameDeckId = source.
                Id = source.GameUserPk,
                //JoinedTime = source.c,
                UserId = source.UserFk,
                Order = source.Order,
            };
        }

        public GameUser Map(GameUserData destination)
        {
            throw new NotImplementedException();
        }
    }
}
