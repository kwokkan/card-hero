using System;

namespace KwokKan.Sortable
{
    public interface ISortableFilter<T>
    {
        Func<T, object> Sort { get; set; }

        SortDirection? SortDirection { get; set; }
    }
}
