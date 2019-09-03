using System;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Represents an error when a card is used which is invalid or the player does not own it.
    /// </summary>
    public class InvalidCardException : CardHeroException
    {
        public InvalidCardException()
        {
        }

        public InvalidCardException(string message)
            : base(message)
        {
        }

        public InvalidCardException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
