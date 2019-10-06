using System;
using System.Linq.Expressions;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameMapper : IMapper<Game, GameData>
    {
        Expression<Func<Game, GameData>> IMapper<Game, GameData>.Map
        {
            get
            {
                return source => new GameData
                {
                    Columns = source.Columns,
                    CurrentGameUserId = source.CurrentGameUserFk,
                    EndTime = source.EndTime,
                    Id = source.GamePk,
                    MaxPlayers = source.MaxPlayers,
                    Name = source.Name,
                    Rows = source.Rows,
                    StartTime = source.StartTime,
                    Type = (GameType)source.GameTypeFk,
                    WinnerId = source.WinnerFk,
                };
            }
        }
    }
}
