using System;

namespace CardHero.Core.Abstractions
{
	/// <summary>
	/// Represents a player which is invalid.
	/// </summary>
	public class InvalidPlayerException : CardHeroException
	{
		public InvalidPlayerException()
		{
		}

		public InvalidPlayerException(string message)
            : base(message)
		{
		}

		public InvalidPlayerException(string message, Exception innerException)
            : base(message, innerException)
		{
		}
	}
}
