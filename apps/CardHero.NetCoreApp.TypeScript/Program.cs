using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace CardHero.NetCoreApp.TypeScript
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost
                .CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureAppConfiguration(x =>
                {
                    x.AddEnvironmentVariables("CARD_HERO_");
                });
    }
}
