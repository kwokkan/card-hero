using System;
using System.Linq.Expressions;

using CardHero.Data.Abstractions;

namespace CardHero.Data.SqlServer
{
    public interface IMapper<TSource, TDestination>
        where TDestination : IData
    {
        Expression<Func<TSource, TDestination>> Map { get; }
    }
}
