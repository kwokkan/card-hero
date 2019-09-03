using System;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Base exception for all Card Hero exceptions.
    /// </summary>
    public class CardHeroException : Exception
    {
        public CardHeroException()
        {
        }

        public CardHeroException(string message)
            : base(message)
        {
        }

        public CardHeroException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
