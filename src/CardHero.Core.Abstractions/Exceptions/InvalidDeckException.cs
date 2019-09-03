using System;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Represents an error when a deck is used which is invalid or the player does not own it.
    /// </summary>
    public class InvalidDeckException : CardHeroException
    {
        public InvalidDeckException()
        {
        }

        public InvalidDeckException(string message)
            : base(message)
        {
        }

        public InvalidDeckException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
