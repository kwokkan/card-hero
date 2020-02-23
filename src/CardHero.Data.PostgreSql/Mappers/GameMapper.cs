using System;

using CardHero.Data.Abstractions;
using CardHero.Data.PostgreSql.EntityFramework;

namespace CardHero.Data.PostgreSql
{
    internal class GameMapper : IMapper<Game, GameData>
    {
        GameData IMapper<Game, GameData>.Map(Game from)
        {
            return new GameData
            {
                Columns = from.Columns,
                CurrentGameUserId = from.CurrentGameUserFk,
                EndTime = from.EndTime,
                Id = from.GamePk,
                MaxPlayers = from.MaxPlayers,
                Rows = from.Rows,
                StartTime = from.StartTime,
                Type = (GameType)from.GameTypeFk,
                WinnerId = from.WinnerFk,
            };
        }

        Game IMapper<Game, GameData>.Map(GameData from)
        {
            throw new NotImplementedException();
        }
    }
}
