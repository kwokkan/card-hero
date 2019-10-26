namespace CardHero.Data.SqlServer.EntityFramework
{
    public interface ICardHeroDataDbContextFactory
    {
        CardHeroDataDbContext Create(bool trackChanges = false);
    }
}
