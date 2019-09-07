namespace CardHero.Data.Abstractions
{
    public class SearchResult<T>
    {
        /// <summary>
        /// 0 based offset for page.
        /// </summary>
        public int CurrentPage { get; set; }

        /// <summary>
        /// Number of items to returned.
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Total of all items.
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// Items based on <see cref="CurrentPage"/> and <see cref="PageSize"/>.
        /// </summary>
        public T[] Results { get; set; }
    }
}
