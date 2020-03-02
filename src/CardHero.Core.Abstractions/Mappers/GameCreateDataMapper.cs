using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class GameCreateDataMapper : IDataMapper<GameCreateData, GameCreateModel>
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
                MaxPlayers = from.MaxPlayers,
                Rows = from.Rows,
                Type = (Data.Abstractions.GameType)(int)from.Type,
            };
        }
    }
}
