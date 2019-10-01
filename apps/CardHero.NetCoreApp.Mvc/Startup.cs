using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using System.Threading.Tasks;

using CardHero.Core.SqlServer.Web;

using KwokKan.Options;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using WebMarkupMin.AspNetCore2;

namespace CardHero.NetCoreApp.Mvc
{
    public class Startup
    {
        private readonly KwokKanOptions _options;

        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            _options = Configuration.GetSection("KwokKan").Get<KwokKanOptions>();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var kkidOptions = _options.Identity;

            services.AddLogging(x =>
            {
                x.AddConfiguration(Configuration.GetSection("Logging"));
                x.AddConsole();
                x.AddDebug();
            });

            services
                .AddAuthentication(x =>
                {
                    x.DefaultScheme = "oidc";
                })
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddOpenIdConnect("oidc", x =>
                {
                    x.Authority = kkidOptions.Authority;
                    x.ClientId = kkidOptions.ClientId;
                    x.ClientSecret = kkidOptions.ClientSecret;
                    x.Events = new Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents
                    {
                        OnRedirectToIdentityProvider = (context) =>
                        {
                            var absoluteBaseUri = string.Format(
                                "{0}://{1}{2}",
                                context.Request.Scheme,
                                context.Request.Host,
                                context.Request.PathBase.HasValue ? "/" + context.Request.PathBase : string.Empty
                            );
                            var absoluteRedirectUri = $"{ absoluteBaseUri }/Account/Login";

                            if (context.Request.Path == "/Account/Login" && context.Properties.RedirectUri == absoluteRedirectUri)
                            {
                                var referer = (string)context.Request.Headers["Referer"];

                                if (referer != null && referer.StartsWith(absoluteBaseUri + "/"))
                                {
                                    context.Properties.RedirectUri = referer;
                                }
                            }

                            return Task.CompletedTask;
                        },
                    };
                    x.GetClaimsFromUserInfoEndpoint = true;
                    x.ResponseType = "code id_token token";
                    x.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        NameClaimType = "name",
                        RoleClaimType = "role",
                    };

                    if (kkidOptions.Scopes != null)
                    {
                        foreach (var scope in kkidOptions.Scopes)
                        {
                            x.Scope.Add(scope);
                        }
                    }
                })
            ;

            // Add framework services.
            services
                .AddControllersWithViews()
                .AddJsonOptions(x =>
                {
                    x.JsonSerializerOptions.IgnoreNullValues = true;
                    x.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                })
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

            services.AddCardHeroDataSqlServer(Configuration);

            services.AddCardHeroSqlServerDbContext(Configuration);

            services.ConfigureTagHelpers(Configuration);

            services.Configure<KwokKanCdnOptions>(options =>
            {
                options.BaseUrl = _options.Cdn.BaseUrl;
            });

            services.UseCardHeroServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

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
