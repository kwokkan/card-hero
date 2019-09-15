namespace CardHero.Data.Abstractions
{
    /// <summary>
    /// Property for letting values to be set to null.
    /// </summary>
    /// <typeparam name="T">Type of property.</typeparam>
    public struct UpdateProperty<T>
    {
        /// <summary>
        /// true if this has been set.
        /// </summary>
        public bool IsSet { get; }

        /// <summary>
        /// The value. Can be null if <see cref="IsSet"/> is true.
        /// </summary>
        public T Value { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="UpdateProperty{T}"/> struct.
        /// This sets the <see cref="IsSet"/> property to true.
        /// </summary>
        /// <param name="value">The value.</param>
        public UpdateProperty(T value)
        {
            IsSet = true;
            Value = value;
        }

        public static implicit operator UpdateProperty<T>(T value) => new UpdateProperty<T>(value);
    }
}
