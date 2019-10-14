using CardHero.Core.Models;
using CardHero.Data.Abstractions;

namespace CardHero.Core.Abstractions
{
    public class MoveDataMapper : IDataMapper<MoveData, MoveModel>
    {
        MoveModel IDataMapper<MoveData, MoveModel>.Map(MoveData from)
        {
            return new MoveModel
            {
                Column = from.Column,
                GameDeckCardCollectionId = from.GameDeckCardCollectionId,
                GameId = from.GameId,
                Row = from.Row,
                UserId = from.GameUserId,
            };
        }

        MoveData IDataMapper<MoveData, MoveModel>.Map(MoveModel from)
        {
            throw new System.NotImplementedException();
        }
    }
}
