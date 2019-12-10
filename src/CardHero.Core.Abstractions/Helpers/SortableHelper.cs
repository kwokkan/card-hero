using System;
using System.Linq;
using System.Linq.Expressions;

namespace CardHero.Core.Abstractions
{
    public class SortableHelper : ISortableHelper
    {
        private void ApplySortable<T>(ISortableFilter<T> filter, string propertyName = null)
        {
            if (!string.IsNullOrWhiteSpace(propertyName))
            {
                var property = typeof(T)
                    .GetProperties()
                    .Where(x => x.Name == propertyName)
                    .FirstOrDefault();

                if (property != null)
                {
                    var parameterExpression = Expression.Parameter(typeof(T));
                    var propertyExpression = Expression.Property(parameterExpression, property);

                    var convertedPropertyExpression = Expression.Convert(propertyExpression, typeof(object));
                    var propertyFunction = Expression.Lambda<Func<T, object>>(convertedPropertyExpression, parameterExpression).Compile();

                    filter.Sort = propertyFunction;
                }
            }
        }

        public ISortableFilter<T> ApplySortable<T>(ISortableFilter<T> filter, string propertyName = null, SortDirection sortDirection = SortDirection.Ascending)
        {
            ApplySortable(filter, propertyName);

            filter.SortDirection = sortDirection;

            return filter;
        }

        public ISortableFilter<T> ApplySortable<T>(ISortableFilter<T> filter, string propertyName = null, string sortDirection = nameof(SortDirection.Ascending))
        {
            ApplySortable(filter, propertyName);

            if (Enum.TryParse(sortDirection, out SortDirection sd))
            {
                filter.SortDirection = sd;
            }

            return filter;
        }
    }
}
