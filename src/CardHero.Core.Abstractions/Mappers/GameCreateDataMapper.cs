using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    internal class GameCreateDataMapper : IDataMapper<GameCreateData, GameCreateModel>
    {
        GameCreateModel IDataMapper<GameCreateData, GameCreateModel>.Map(GameCreateData from)
        {
            throw new NotImplementedException();
        }

        GameCreateData IDataMapper<GameCreateData, GameCreateModel>.Map(GameCreateModel from)
        {
            return new GameCreateData
            {
                Columns = from.Columns,
                CurrentGameUserId = from.CurrentGameUserId,
                MaxPlayers = from.MaxPlayers,
                Name = from.Name,
                Rows = from.Rows,
                Type = (Data.Abstractions.GameType)(int)from.Type,
            };
        }
    }
}
