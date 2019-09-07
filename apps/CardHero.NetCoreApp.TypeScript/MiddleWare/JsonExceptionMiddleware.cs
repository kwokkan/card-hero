using System;
using System.IO;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript.Models;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CardHero.NetCoreApp.TypeScript.Middleware
{
    public class JsonExceptionMiddleware
    {
        private static readonly string _newLine = Environment.NewLine;
        private static readonly JsonSerializerSettings _settings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
        };

        private readonly ILogger<JsonExceptionMiddleware> _logger;
        private readonly IHostingEnvironment _environment;
        private readonly RequestDelegate _next;

        public JsonExceptionMiddleware(ILogger<JsonExceptionMiddleware> logger, IHostingEnvironment environment, RequestDelegate next)
        {
            _logger = logger;
            _environment = environment;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                if (context.Response.HasStarted)
                {
                    _logger.LogWarning("Skipping " + nameof(JsonExceptionMiddleware) + ". Response has alreaady started.");
                    throw;
                }

                _logger.LogError(e, $"Exception occurred at { context.Request.Method } { context.Request.Path }.");

                if (context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.StatusCode = 400;
                    context.Response.ContentType = "application/json";

                    var model = new ErrorViewModel
                    {
                        Message = e.Message,
                    };

                    if (_environment.IsDevelopment())
                    {
                        model.StackTrace = e.StackTrace.Split(_newLine);
                    }

                    var response = JsonConvert.SerializeObject(model, _settings);

                    using (var ms = new MemoryStream())
                    using (var sw = new StreamWriter(ms))
                    {
                        await sw.WriteAsync(response);
                        await sw.FlushAsync();
                        ms.Position = 0;

                        await context.Response.Body.WriteAsync(ms.ToArray());
                    }
                }
                else
                {
                    context.Response.StatusCode = 500;
                }
            }
        }
    }
}
