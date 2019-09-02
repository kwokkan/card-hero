using System;

namespace CardHero.Core.Abstractions
{
	/// <summary>
	/// Represents an error when a player takes a turn when it is not expected.
	/// </summary>
	public class InvalidTurnException : CardHeroException
	{
		public InvalidTurnException()
		{
		}

		public InvalidTurnException(string message)
            : base(message)
		{
		}

		public InvalidTurnException(string message, Exception innerException)
            : base(message, innerException)
		{
		}
	}
}
