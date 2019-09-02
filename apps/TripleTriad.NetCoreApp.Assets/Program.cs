using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace CardHero.Assets
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
				.UseUrls("http://localhost:55670")
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
