namespace CardHero.Data.SqlServer
{
    public interface IMapper<TSource, TDestination>
    {
        TDestination Map(TSource from);

        TSource Map(TDestination from);
    }
}
