namespace CardHero.Data.Abstractions
{
    public class DeckUpdateData
    {
        public UpdateProperty<int[]> CardCollectionIds { get; set; } = default;
    }
}
