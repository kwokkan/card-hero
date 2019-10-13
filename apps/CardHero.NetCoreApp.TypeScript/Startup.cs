﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net;
using System.Threading.Tasks;

using CardHero.AspNetCore.Authentication.FileSystem;
using CardHero.Core.SqlServer.Web;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using WebMarkupMin.AspNet.Common.UrlMatchers;
using WebMarkupMin.AspNetCore3;

namespace CardHero.NetCoreApp.TypeScript
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var authBuilder = services
                .AddAuthentication(x =>
                {
                    x.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                })
                .AddCookie(x =>
                {
                    x.LoginPath = "/SignIn";
                    x.LogoutPath = "/SignOut";

                    x.Cookie.Name = ".ch";
                    x.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict;
                    x.ExpireTimeSpan = TimeSpan.FromTicks(TimeSpan.TicksPerDay * 28);
                    x.SlidingExpiration = true;

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

                    if (_environment.IsDevelopment())
                    {
                        var baseDirectory = Path.Combine(_environment.ContentRootPath, "data", nameof(JsonFileSystemTicketStore));

                        if (!Directory.Exists(baseDirectory))
                        {
                            Directory.CreateDirectory(baseDirectory);
                        }

                        x.SessionStore = new JsonFileSystemTicketStore(
                            LoggerFactory.Create(x =>
                            {
                                x.AddConfiguration(_configuration);
                                x.AddDebug();
                                x.AddConsole();
                            }).CreateLogger<JsonFileSystemTicketStore>(),  //HACK: create empy logger without DI
                            new FileSystemTicketStoreOptions
                            {
                                BaseDirectory = baseDirectory,
                            }
                        );
                    }
                })
            ;

            var localAuthOptions = _configuration.GetSection("Authentication:Local").Get<LocalAuthenticationOptions>();
            if (localAuthOptions != null)
            {
                localAuthOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                authBuilder.AddLocalAuthentication(localAuthOptions);
            }

            var githubAuthOptions = _configuration.GetSection("Authentication:GitHub").Get<GitHubAuthenticationOptions>();
            if (githubAuthOptions != null)
            {
                githubAuthOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                authBuilder.AddGitHubAuthentication(githubAuthOptions);
            }

            services
                .AddControllersWithViews()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
            ;

            services
                .AddResponseCompression(x =>
                {
                    x.EnableForHttps = true;
                })
            ;

            services.AddOpenApiDocument(x =>
            {
                x.Description = "Card Hero OpenAPI document.";
                x.GenerateExamples = true;
                x.Title = "Card Hero API";
            });

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

                    x.ExcludedPages.Add(new WildcardUrlMatcher("/swagger/*"));
                })
            ;

            services.AddCardHeroDataSqlServer(_configuration);

            services.AddCardHeroSqlServerDbContext(_configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseJsonException();

            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
            app.UseHttpsRedirection();

            app.UseResponseCompression();

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

            app.UseOpenApi(); // serve OpenAPI/Swagger documents
            app.UseSwaggerUi3(); // serve Swagger UI
            //app.UseReDoc(); // serve ReDoc UI
        }
    }
}
