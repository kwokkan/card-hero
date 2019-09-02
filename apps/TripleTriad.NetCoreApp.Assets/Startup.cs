using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CardHero.Assets
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
			services.AddCors();

            services.AddResponseCompression();
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

			app.UseCors(policy =>
			{
				policy.AllowAnyHeader();
				policy.AllowAnyMethod();
				policy.AllowAnyOrigin();
			});

            app.UseResponseCompression();

			var staticFileOptions = new StaticFileOptions
			{
				OnPrepareResponse = (context) =>
				{
					if (
						context.Context.Request.Path.StartsWithSegments("/nodelib", StringComparison.OrdinalIgnoreCase) ||
						context.Context.Request.Path.StartsWithSegments("/lib", StringComparison.OrdinalIgnoreCase)
					)
					{
						context.Context.Response.Headers.Add("Cache-Control", "public, max-age=31536000, stale-while-revalidate=31536000, stale-if-error=31536000");
					}
				}
			};
			app.UseStaticFiles(staticFileOptions);
		}
	}
}
