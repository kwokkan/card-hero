namespace CardHero.Data.Abstractions
{
    public class GameUpdateData
    {
        public UpdateProperty<int?> CurrentUserId { get; set; } = default;

        public UpdateProperty<int?> WinnerId { get; set; } = default;
    }
}
