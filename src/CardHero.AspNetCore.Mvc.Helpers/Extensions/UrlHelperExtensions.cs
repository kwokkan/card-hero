using System;
using Microsoft.AspNetCore.Mvc;

namespace CardHero.AspNetCore.Mvc.Helpers
{
    public static class UrlHelperExtensions
    {
		public static string CdnContent(this IUrlHelper urlHelper, string path)
		{
			if (path == null)
            {
                throw new ArgumentException(nameof(path));
            }

            if (path.StartsWith("~/"))
			{
				return $"http://localhost:55670/{path.Substring(2)}";
			}

			return path;
		}
    }
}
