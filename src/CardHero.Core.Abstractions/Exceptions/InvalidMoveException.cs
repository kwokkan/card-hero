using System;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Represents an error when a move is taken outside the bounds of the grid.
    /// </summary>
    public class InvalidMoveException : CardHeroException
    {
        public InvalidMoveException()
        {
        }

        public InvalidMoveException(string message)
            : base(message)
        {
        }

        public InvalidMoveException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
