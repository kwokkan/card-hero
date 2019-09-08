using System;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameMapper : IMapper<Game, GameData>
    {
        public GameData Map(Game from)
        {
            return new GameData
            {
                Columns = from.Columns,
                CurrentGameUserId = from.CurrentGameUserFk,
                EndTime = from.EndTime,
                Id = from.GamePk,
                Name = from.Name,
                Rows = from.Rows,
                StartTime = from.StartTime,
                Type = (GameType)from.GameTypeFk,
                WinnerId = from.WinnerFk,
            };
        }

        public Game Map(GameData from)
        {
            throw new NotImplementedException();
        }
    }
}
