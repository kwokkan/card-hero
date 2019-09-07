using System;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class GameMapper : IMapper<Game, GameData>
    {
        public GameData Map(Game source)
        {
            return new GameData
            {
                Columns = source.Columns,
                CurrentGameUserId = source.CurrentGameUserFk,
                EndTime = source.EndTime,
                Id = source.GamePk,
                Name = source.Name,
                Rows = source.Rows,
                StartTime = source.StartTime,
                Type = (GameType)source.GameTypeFk,
                WinnerId = source.WinnerFk,
            };
        }

        public Game Map(GameData destination)
        {
            throw new NotImplementedException();
        }
    }
}
