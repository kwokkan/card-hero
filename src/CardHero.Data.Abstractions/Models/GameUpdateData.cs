namespace CardHero.Data.Abstractions
{
    public class GameUpdateData
    {
        public UpdateProperty<int?> CurrentGameUserId { get; set; } = default;

        public UpdateProperty<int?> WinnerId { get; set; } = default;
    }
}
