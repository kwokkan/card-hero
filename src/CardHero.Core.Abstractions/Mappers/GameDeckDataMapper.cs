using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class GameDeckDataMapper : IDataMapper<GameDeckData, GameDeckModel>
    {
        GameDeckModel IDataMapper<GameDeckData, GameDeckModel>.Map(GameDeckData from)
        {
            return new GameDeckModel
            {
                Description = from.Description,
                GameUserId = from.GameUserId,
                Id = from.Id,
                Name = from.Name,
            };
        }

        GameDeckData IDataMapper<GameDeckData, GameDeckModel>.Map(GameDeckModel from)
        {
            throw new NotImplementedException();
        }
    }
}
