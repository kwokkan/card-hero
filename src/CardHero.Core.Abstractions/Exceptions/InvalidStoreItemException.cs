using System;

namespace CardHero.Core.Abstractions
{
	/// <summary>
	/// Represents an error when a store item is invalid.
	/// </summary>
	public class InvalidStoreItemException : CardHeroException
	{
		public InvalidStoreItemException()
		{
		}

		public InvalidStoreItemException(string message)
            : base(message)
		{
		}

		public InvalidStoreItemException(string message, Exception innerException)
            : base(message, innerException)
		{
		}
	}
}
