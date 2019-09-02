using IdentityModel;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using CardHero.Core.SqlServer.Web;

namespace CardHero.Web.Angular
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddCookie(x =>
            {
                //AutomaticChallenge = true,
                //LoginPath = new PathString("/Account/Login")
            })
            .AddOpenIdConnect(x =>
            {
                x.Authority = "http://localhost:4433";
                x.ClientId = "TripleTriadMvcClient";
                x.ResponseType = "id_token";

                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    NameClaimType = JwtClaimTypes.Name,
                    RoleClaimType = JwtClaimTypes.Role
                };

                x.RequireHttpsMetadata = false;
            });

			services
				.AddMvc()
				.AddJsonOptions(x =>
				{
					x.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
					x.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
				});

			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddCardHeroSqlServerDbContext(Configuration);

			services.ConfigureTagHelpers(Configuration);
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

			//app.Use((context, middleware) =>
			//{
			//	if (context.User?.Identity?.IsAuthenticated == true)
			//	{
			//		(context.User.Identity as System.Security.Claims.ClaimsIdentity).AddClaim(new System.Security.Claims.Claim("1232", context.User.Identity.Name));
			//	}

			//	return middleware();
			//});

			app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
