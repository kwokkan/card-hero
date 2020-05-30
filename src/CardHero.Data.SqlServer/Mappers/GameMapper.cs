using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameMapper : IMapper<Game, GameData>
    {
        GameData IMapper<Game, GameData>.Map(Game from)
        {
            return new GameData
            {
                Columns = from.Columns,
                CurrentUserId = from.CurrentUserFk,
                EndTime = from.EndTime,
                Id = from.GamePk,
                MaxPlayers = from.MaxPlayers,
                Rows = from.Rows,
                StartTime = from.StartTime,
                Type = (GameType)from.GameTypeFk,
                WinnerUserId = from.WinnerUserFk,
            };
        }

        Game IMapper<Game, GameData>.Map(GameData from)
        {
            throw new NotImplementedException();
        }
    }
}
