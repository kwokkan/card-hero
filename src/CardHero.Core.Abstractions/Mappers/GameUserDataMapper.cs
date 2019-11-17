using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class GameUserDataMapper : IDataMapper<GameUserData, GameUserModel>
    {
        GameUserModel IDataMapper<GameUserData, GameUserModel>.Map(GameUserData from)
        {
            return new GameUserModel
            {
                GameId = from.GameId,
                Id = from.Id,
                Order = from.Order,
                UserId = from.UserId,
            };
        }

        GameUserData IDataMapper<GameUserData, GameUserModel>.Map(GameUserModel from)
        {
            throw new NotImplementedException();
        }
    }
}
