using CardHero.NetCoreApp.TypeScript.MiddleWare;

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
