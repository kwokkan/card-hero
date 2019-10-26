using System;

namespace CardHero.Data.Abstractions
{
    public class TurnUpdateData
    {
        public UpdateProperty<DateTime?> EndTime { get; set; } = default;
    }
}
