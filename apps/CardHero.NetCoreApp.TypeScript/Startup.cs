using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Threading.Tasks;

using CardHero.Core.SqlServer.Web;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using WebMarkupMin.AspNetCore2;

namespace CardHero.NetCoreApp.TypeScript
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var localAuthOptions = Configuration.GetSection("Authentication:Local").Get<LocalAuthenticationOptions>();
            localAuthOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

            var githubAuthOptions = Configuration.GetSection("Authentication:GitHub").Get<GitHubAuthenticationOptions>();
            githubAuthOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

            services
                .AddAuthentication(x =>
                {
                    x.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                })
                .AddCookie(x =>
                {
                    x.LoginPath = "/SignIn";
                    x.LogoutPath = "/SignOut";

                    x.Cookie.Name = ".ch";

                    x.Events.OnRedirectToLogin = context =>
                    {
                        if (context.Request.Path.StartsWithSegments("/api"))
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        else
                        {
                            context.Response.Redirect(context.RedirectUri);
                        }

                        return Task.CompletedTask;
                    };
                })
                .AddLocalAuthentication(localAuthOptions)
                .AddGitHubAuthentication(githubAuthOptions)
            ;

            services
                .AddControllersWithViews()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
            ;

            services
                .AddWebMarkupMin(x =>
                {
                    x.AllowCompressionInDevelopmentEnvironment = true;
                    x.AllowMinificationInDevelopmentEnvironment = true;
                    x.DisablePoweredByHttpHeaders = true;
                })
                .AddHtmlMinification(x =>
                {
                    x.MinificationSettings.AttributeQuotesRemovalMode = WebMarkupMin.Core.HtmlAttributeQuotesRemovalMode.KeepQuotes;
                    x.MinificationSettings.EmptyTagRenderMode = WebMarkupMin.Core.HtmlEmptyTagRenderMode.Slash;
                    x.MinificationSettings.MinifyEmbeddedCssCode = true;
                    x.MinificationSettings.MinifyEmbeddedJsCode = true;
                    x.MinificationSettings.MinifyEmbeddedJsonData = true;
                    x.MinificationSettings.MinifyInlineCssCode = true;
                    x.MinificationSettings.MinifyInlineJsCode = true;
                    x.MinificationSettings.RemoveEmptyAttributes = true;
                    x.MinificationSettings.RemoveHtmlComments = true;
                    x.MinificationSettings.RemoveHtmlCommentsFromScriptsAndStyles = true;
                    x.MinificationSettings.RemoveOptionalEndTags = false;
                    x.MinificationSettings.WhitespaceMinificationMode = WebMarkupMin.Core.WhitespaceMinificationMode.Aggressive;

                    x.SupportedHttpMethods.Add("POST");
                })
            ;

            services.AddCardHeroSqlServerDbContext(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseJsonException();

            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
            app.UseHttpsRedirection();

            var staticFileOptions = new StaticFileOptions
            {
                OnPrepareResponse = (context) =>
                {
                    if (
                        context.Context.Request.Path.StartsWithSegments("/dist", StringComparison.OrdinalIgnoreCase)
                    )
                    {
                        context.Context.Response.Headers.Add("Cache-Control", "public, max-age=31536000, stale-while-revalidate=31536000, stale-if-error=31536000, immutable");

                        if (env.IsDevelopment())
                        {
                            var sourceMapFileName = context.File.Name + ".map";
                            context.Context.Response.Headers.Add("SourceMap", sourceMapFileName);
                            context.Context.Response.Headers.Add("X-SourceMap", sourceMapFileName);
                        }
                    }
                },
            };
            app.UseStaticFiles(staticFileOptions);

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            app.UseRouting();

            app
                .UseAuthentication()
                .UseAuthorization()
            ;

            app.UseWebMarkupMin();

            app.UseEndpoints(x =>
            {
                x.MapDefaultControllerRoute();
            });
        }
    }
}
