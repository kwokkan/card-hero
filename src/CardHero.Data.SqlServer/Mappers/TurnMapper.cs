using System;

using CardHero.Data.Abstractions;
using CardHero.Data.SqlServer.EntityFramework;

namespace CardHero.Data.SqlServer
{
    internal class TurnMapper : IMapper<Turn, TurnData>
    {
        TurnData IMapper<Turn, TurnData>.Map(Turn from)
        {
            return new TurnData
            {
                CurrentGameUserId = from.CurrentGameUserFk,
                EndTime = from.EndTime,
                GameId = from.GameFk,
                Id = from.TurnPk,
                StartTime = from.StartTime,
            };
        }

        Turn IMapper<Turn, TurnData>.Map(TurnData from)
        {
            throw new NotImplementedException();
        }
    }
}
