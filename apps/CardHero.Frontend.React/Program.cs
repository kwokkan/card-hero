using System.Threading.Tasks;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace CardHero.Frontend.React
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var host = Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.Configure(app =>
                    {
                        app.Run(context =>
                        {
                            return Task.CompletedTask;
                        });
                    });
                })
                .Build();

            host.Run();
        }
    }
}
