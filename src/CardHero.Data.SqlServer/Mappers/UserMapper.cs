using System;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    public class UserMapper : IMapper<User, UserData>
    {
        UserData IMapper<User, UserData>.Map(User from)
        {
            return new UserData
            {
                Coins = from.Coins,
                FullName = from.FullName,
                Id = from.UserPk,
            };
        }

        User IMapper<User, UserData>.Map(UserData from)
        {
            throw new NotImplementedException();
        }
    }
}
