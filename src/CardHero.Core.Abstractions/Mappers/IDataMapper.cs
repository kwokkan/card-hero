namespace CardHero.Core.Abstractions
{
    public interface IDataMapper<TSource, TDestination>
    {
        TDestination Map(TSource source);

        TSource Map(TDestination destination);
    }
}
