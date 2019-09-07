using System;

using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class GameDataMapper : IDataMapper<GameData, Game>
    {
        public Game Map(GameData source)
        {
            return new Game
            {
                Columns = source.Columns,
                EndTime = source.EndTime,
                Id = source.Id,
                Name = source.Name,
                Rows = source.Rows,
                StartTime = source.StartTime,
                Type = (Models.GameType)(int)source.Type,
            };
        }

        public GameData Map(Game destination)
        {
            throw new NotImplementedException();
        }
    }
}
