using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using CardHero.Core.SqlServer.EntityFramework;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CardHero.Core.SqlServer.Services
{
    public abstract class BaseService
    {
        private readonly IDesignTimeDbContextFactory<CardHeroDbContext> _contextFactory;
        private readonly Lazy<CardHeroDbContext> _context;

        public BaseService(IDesignTimeDbContextFactory<CardHeroDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
            _context = new Lazy<CardHeroDbContext>(() => _contextFactory.CreateDbContext(new string[0]));
        }

        protected CardHeroDbContext GetContext()
        {
            return _context.Value;
        }

        /// <summary>
        /// Validates and sets various properties.
        /// </summary>
        private void Validate<T>(SearchFilter<T> filter)
            where T : class, ICardHeroEntity
        {
            if (!filter.Page.HasValue || filter.Page.Value < 0)
            {
                filter.Page = 0;
            }

            if (filter.PageSize.HasValue && filter.PageSize.Value <= 0)
            {
                filter.PageSize = null;
            }
        }

        protected async Task<SearchResult<TResult>> PaginateAndSortAsync<TIn, TResult>(IQueryable<TIn> query, SearchFilter<TResult> filter, Func<TIn, TResult> selector, CancellationToken cancellationToken = default)
            where TResult : class, ICardHeroEntity
        {
            var result = new SearchResult<TResult>
            {
                Count = await query.CountAsync(cancellationToken: cancellationToken),
            };

            var q = query.Select(selector);

            if (filter != null)
            {
                Validate(filter);

                if (filter.Sort != null)
                {
                    switch (filter.SortDirection)
                    {
                        case SortDirection.Ascending:
                            q = q.OrderBy(filter.Sort).AsQueryable();
                            break;
                        case SortDirection.Descending:
                            q = q.OrderByDescending(filter.Sort).AsQueryable();
                            break;
                    }
                }

                if (filter.PageSize.HasValue)
                {
                    q = q
                        .Skip(filter.Page.Value * filter.PageSize.Value)
                        .Take(filter.PageSize.Value);
                }
            }

            result.Results = q.ToArray();

            return result;
        }
    }
}
