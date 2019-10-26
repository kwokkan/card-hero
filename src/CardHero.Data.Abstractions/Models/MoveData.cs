﻿namespace CardHero.Data.Abstractions
{
    public class MoveData
    {
        /// <summary>
        /// The game to make a move on.
        /// </summary>
        public int GameId { get; set; }

        /// <summary>
        /// The card id played.
        /// </summary>
        public int CardId { get; set; }

        /// <summary>
        /// The card to play.
        /// </summary>
        public int GameDeckCardCollectionId { get; set; }

        /// <summary>
        /// Zero based index of the row.
        /// </summary>
        public int Row { get; set; }

        /// <summary>
        /// Zero based index of the column.
        /// </summary>
        public int Column { get; set; }

        /// <summary>
        /// The user making the move.
        /// </summary>
        public int GameUserId { get; set; }

        /// <summary>
        /// The turn.
        /// </summary>
        public int TurnId { get; set; }
    }
}
