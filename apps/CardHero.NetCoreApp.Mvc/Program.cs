using System;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

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
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseApplicationInsights();
    }
}
