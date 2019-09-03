using System.Linq;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Primitives;

namespace CardHero.AspNetCore.Mvc.Helpers
{
    public static class HtmlHelperExtensions
    {
        private static string PreloadLink(IHtmlHelper helper, string link, string type, bool preload)
        {
            var preloadLink = link;

            if (preloadLink.StartsWith("~/"))
            {
                preloadLink = "http://localhost:55670/" + preloadLink.Substring(2);
            }

            if (preload)
            {
                var linkValue = $"<{ preloadLink }>; rel=preload; as={ type };";
                var responseHeaders = helper.ViewContext.HttpContext.Response.Headers;
                var stringValues = default(StringValues);

                if (responseHeaders.TryGetValue("Link", out stringValues))
                {
                    responseHeaders.Remove("Link");
                }

                if (!stringValues.Any())
                {
                    stringValues = new StringValues(linkValue);
                }
                else
                {
                    var sv = stringValues.Select(x => x).ToList();
                    sv.Add(linkValue);
                    stringValues = new StringValues(sv.ToArray());
                }

                responseHeaders.Add("Link", stringValues);
            }

            return preloadLink;
        }

        public static IHtmlContent CdnScript(this IHtmlHelper helper, string src, bool preload = false)
        {
            var cdnSrc = PreloadLink(helper, src, "script", preload);

            var scriptTag = $"<script src=\"{ cdnSrc }\"></script>";
            return helper.Raw(scriptTag);
        }

        public static IHtmlContent CdnStyle(this IHtmlHelper helper, string href, bool preload = false)
        {
            var cdnHref = PreloadLink(helper, href, "script", preload);

            var scriptTag = $"<link rel=\"stylesheet\" href=\"{ cdnHref }\" />";
            return helper.Raw(scriptTag);
        }
    }
}
