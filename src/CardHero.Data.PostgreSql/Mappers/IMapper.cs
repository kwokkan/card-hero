namespace CardHero.Data.PostgreSql
{
    public interface IMapper<TSource, TDestination>
    {
        TDestination Map(TSource from);

        TSource Map(TDestination from);
    }
}
