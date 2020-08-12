using System;

namespace CardHero.Data.Abstractions
{
    public class GameUpdateData
    {
        public UpdateProperty<int?> CurrentUserId { get; set; }

        public UpdateProperty<int?> WinnerUserId { get; set; }

        public UpdateProperty<DateTime?> EndTime { get; set; }
    }
}
