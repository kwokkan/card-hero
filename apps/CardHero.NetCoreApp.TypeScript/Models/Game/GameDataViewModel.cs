using System.Collections.Generic;

using CardHero.Core.Models;

namespace CardHero.NetCoreApp.TypeScript
{
    public class GameDataViewModel
    {
        public int Rows { get; set; }

        public int Columns { get; set; }

        public IEnumerable<GameMoveViewModel> Moves { get; set; }

        public IEnumerable<CardModel> PlayedCards { get; set; }
    }
}
