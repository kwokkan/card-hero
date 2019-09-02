using Microsoft.AspNetCore.Http;

namespace CardHero.NetCoreApp.Mvc.Extensions
{
    public static class HttpRequestExtensions
    {
        public static bool IsAjaxRequest(this HttpRequest request)
        {
            // messy 1 liner but it works
            //return ((string)(request)?.Headers?["X-Requested-With"]) == "XMLHttpRequest";

            if (request == null)
            {
                return false;
            }

            if (request.Headers != null)
            {
                return request.Headers["X-Requested-With"] == "XMLHttpRequest";
            }

            return false;
        }
    }
}
