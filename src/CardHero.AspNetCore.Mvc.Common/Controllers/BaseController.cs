using System;
using System.Linq;
using System.Linq.Expressions;
using CardHero.Core.Abstractions;
using CardHero.Core.Models;
using KwokKan.Sortable;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Common.Controllers
{
    public abstract class BaseController : Controller
    {
		protected void ApplySortable<T>(SearchFilter<T> filter, string sortName = Constants.SortName, string sortDirName = Constants.SortDirectionName)
			where T : class, ICardHeroEntity
		{
			var sn = HttpContext.Request.Query[sortName].ToString();
			var property = typeof(T)
				.GetProperties()
				.Where(x => x.Name == sn)
				.FirstOrDefault();

			if (property != null)
			{
				var parameterExpression = Expression.Parameter(typeof(T));
				var propertyExpression = Expression.Property(parameterExpression, property);

				var convertedPropertyExpression = Expression.Convert(propertyExpression, typeof(object));
				var propertyFunction = Expression.Lambda<Func<T, object>>(convertedPropertyExpression, parameterExpression).Compile();

				filter.Sort = propertyFunction;
			}

			SortDirection sortDirection;
			if (Enum.TryParse(HttpContext.Request.Query[sortDirName], out sortDirection))
			{
				filter.SortDirection = sortDirection;
			}
		}
    }
}