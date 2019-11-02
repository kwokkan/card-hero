using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace CardHero.NetCoreApp.TypeScript
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host
                .CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseStartup<Startup>()
                        .ConfigureKestrel(x =>
                        {
                            x.AddServerHeader = false;
                        })
                    ;
                })
                .ConfigureAppConfiguration(x =>
                {
                    x.AddEnvironmentVariables("CARD_HERO_");
                });
    }
}
