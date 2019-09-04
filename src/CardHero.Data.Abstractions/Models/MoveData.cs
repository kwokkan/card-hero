using System;
using System.Collections.Generic;
using System.Text;

namespace CardHero.Data.Abstractions
{
    public class MoveData
    {
        /// <summary>
        /// The game to make a move on.
        /// </summary>
        public int GameId { get; set; }

        /// <summary>
        /// The card to play.
        /// </summary>
        public int CardCollectionId { get; set; }

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
        public int UserId { get; set; }
    }
}
