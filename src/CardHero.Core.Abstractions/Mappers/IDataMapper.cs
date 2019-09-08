namespace CardHero.Core.Abstractions
{
    public interface IDataMapper<TSource, TDestination>
    {
        TDestination Map(TSource from);

        TSource Map(TDestination from);
    }
}
