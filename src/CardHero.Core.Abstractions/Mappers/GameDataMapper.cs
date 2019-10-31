using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class GameDataMapper : IDataMapper<GameData, GameModel>
    {
        public GameModel Map(GameData from)
        {
            return new GameModel
            {
                Columns = from.Columns,
                CurrentGameUserId = from.CurrentGameUserId,
                CurrentUser = from.CurrentGameUserId == null ? null : new UserModel
                {
                    Id = from.CurrentGameUserId.Value,
                },
                EndTime = from.EndTime,
                Id = from.Id,
                Name = from.Name,
                Rows = from.Rows,
                StartTime = from.StartTime,
                Type = (Models.GameType)(int)from.Type,
            };
        }

        public GameData Map(GameModel from)
        {
            return new GameData
            {
                Columns = from.Columns,
                CurrentGameUserId = from.CurrentUser?.Id,
                EndTime = from.EndTime,
                Id = from.Id,
                Name = from.Name,
                Rows = from.Rows,
                StartTime = from.StartTime,
                Type = (Data.Abstractions.GameType)(int)from.Type,
                WinnerId = from.Winner?.Id,
            };
        }
    }
}
