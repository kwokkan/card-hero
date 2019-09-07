namespace CardHero.Data.SqlServer
{
    public interface IMapper<TSource, TDestination>
    {
        TDestination Map(TSource source);

        TSource Map(TDestination destination);
    }
}
