﻿using System.Collections.Generic;

namespace CardHero.Core.Models
{
    /// <summary>
    /// Game play model.
    /// </summary>
    public class GamePlayModel
    {
        /// <summary>
        /// Game.
        /// </summary>
        public GameModel Game { get; set; }

        /// <summary>
        /// Cards played in game.
        /// </summary>
        public IEnumerable<CardModel> PlayedCards { get; set; }

        /// <summary>
        /// Moves played in game.
        /// </summary>
        public IEnumerable<MoveModel> Moves { get; set; }
    }
}
