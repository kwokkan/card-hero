using System;
using CardHero.Core.Models;
using KwokKan.Sortable;

namespace CardHero.Core.Abstractions
{
    /// <summary>
    /// Base class for all search filters.
    /// </summary>
    public abstract class SearchFilter<T> : ISortableFilter<T>
        where T : class, ICardHeroEntity
    {
        /// <summary>
        /// The page to get. Starts at 0. Defaults to 0.
        /// </summary>
        /// <remarks>null or less than 0 will default to 0.</remarks>
        public int? Page { get; set; }

        /// <summary>
        /// The size of each page. Defaults to 10.
        /// </summary>
        /// <remarks>null or less than 0 will default to all.</remarks>
        public int? PageSize { get; set; }

        /// <summary>
        /// Sort order being applied.
        /// </summary>
        public Func<T, object> Sort { get; set; }

        /// <summary>
        /// Sort direction.
        /// </summary>
        public SortDirection? SortDirection { get; set; }

        /// <summary>
        /// The user id to to filter by.
        /// null means they are not logged in.
        /// </summary>
        public int? UserId { get; set; }

        public SearchFilter()
        {
            Page = 0;
            PageSize = 10;
        }
    }
}
