using CardHero.NetCoreApp.TypeScript.Middleware;

namespace Microsoft.AspNetCore.Builder
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseJsonException(this IApplicationBuilder app)
        {
            app.UseMiddleware<JsonExceptionMiddleware>();

            return app;
        }
    }
}
