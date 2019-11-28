using System;

namespace CardHero.Core.Abstractions
{
    public interface ISortableFilter<T>
    {
        Func<T, object> Sort { get; set; }

        SortDirection? SortDirection { get; set; }
    }
}
