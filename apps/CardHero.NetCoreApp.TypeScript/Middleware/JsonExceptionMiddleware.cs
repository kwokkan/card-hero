using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CardHero.NetCoreApp.TypeScript.Middleware
{
    public class JsonExceptionMiddleware
    {
        private static readonly string _newLine = Environment.NewLine;

        private readonly ILogger<JsonExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _environment;
        private readonly JsonSerializerOptions _options;
        private readonly RequestDelegate _next;

        public JsonExceptionMiddleware(ILogger<JsonExceptionMiddleware> logger, IWebHostEnvironment environment, IOptions<JsonOptions> jsonOptions, RequestDelegate next)
        {
            _logger = logger;
            _environment = environment;
            _options = jsonOptions?.Value?.JsonSerializerOptions;
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
                _logger.LogError(e, $"Exception occurred at { context.Request.Method } { context.Request.Path }.");

                if (context.Response.HasStarted)
                {
                    _logger.LogWarning("Skipping " + nameof(JsonExceptionMiddleware) + ". Response has already started.");
                    return;
                }

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

                    var response = JsonSerializer.Serialize(model, _options);

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
