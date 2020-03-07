using System.Collections.Generic;

using CardHero.Core.Models;

namespace CardHero.NetCoreApp.TypeScript
{
    public class GameDataViewModel
    {
        public IEnumerable<GameMoveViewModel> Moves { get; set; }

        public IEnumerable<CardModel> PlayedCards { get; set; }
    }
}
