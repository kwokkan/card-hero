namespace CardHero.Core.Abstractions
{
    public interface ISortableHelper
    {
        ISortableFilter<T> ApplySortable<T>(ISortableFilter<T> filter, string propertyName = null, SortDirection sortDirection = SortDirection.Ascending);

        ISortableFilter<T> ApplySortable<T>(ISortableFilter<T> filter, string propertyName = null, string sortDirection = nameof(SortDirection.Ascending));
    }
}
