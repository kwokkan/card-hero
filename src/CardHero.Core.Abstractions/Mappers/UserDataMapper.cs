using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class UserDataMapper : IDataMapper<UserData, UserModel>
    {
        UserModel IDataMapper<UserData, UserModel>.Map(UserData from)
        {
            return new UserModel
            {
                Coins = from.Coins,
                FullName = from.FullName,
                Id = from.Id,
            };
        }

        UserData IDataMapper<UserData, UserModel>.Map(UserModel from)
        {
            throw new NotImplementedException();
        }
    }
}
