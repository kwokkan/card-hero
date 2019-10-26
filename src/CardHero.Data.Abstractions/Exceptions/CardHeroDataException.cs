using System;

namespace CardHero.Data.Abstractions
{
    public class CardHeroDataException : Exception
    {
        public CardHeroDataException()
        {
        }

        public CardHeroDataException(string message)
            : base(message)
        {
        }

        public CardHeroDataException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
