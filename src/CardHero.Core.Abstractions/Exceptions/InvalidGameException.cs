using System;

namespace CardHero.Core.Abstractions
{
	/// <summary>
	/// Represents an error when a game is invalid, over or not being played by a player.
	/// </summary>
	public class InvalidGameException : CardHeroException
	{
		public InvalidGameException()
		{
		}

		public InvalidGameException(string message)
            : base(message)
		{
		}

		public InvalidGameException(string message, Exception innerException)
            : base(message, innerException)
		{
		}
	}
}
