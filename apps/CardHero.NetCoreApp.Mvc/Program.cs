using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace CardHero.NetCoreApp.Mvc
{
    public class Program
    {
        //public static void Main(string[] args)
        //{
        //    var host = new WebHostBuilder()
        //        .UseUrls("http://*:51000")
        //        .UseKestrel(x =>
        //        {
        //            x.AddServerHeader = false;
        //            x.Limits.KeepAliveTimeout = TimeSpan.FromSeconds(5);
        //        })
        //        .UseContentRoot(Directory.GetCurrentDirectory())
        //        .UseIISIntegration()
        //        .UseStartup<Startup>()
        //        .UseApplicationInsights()
        //        .Build();

        //    host.Run();
        //}
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseApplicationInsights();
                });
    }
}
