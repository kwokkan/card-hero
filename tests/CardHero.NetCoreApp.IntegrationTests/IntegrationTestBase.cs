using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public abstract class IntegrationTestBase
    {
        protected async Task RunAsync(Func<BaseWebApplicationFactory<Startup>, Task> action, [CallerMemberName]string callerMemberName = "")
        {
            var factories = new BaseWebApplicationFactory<Startup>[]
            {
                new PostgreSqlWebApplicationFactory<Startup>(),
                new SqlServerWebApplicationFactory<Startup>(),
            };

            foreach (var factory in factories)
            {
                try
                {
                    await action(factory);
                }
                catch (Exception e)
                {
                    throw new Exception(factory.ToString() + " - " + callerMemberName, e);
                }
            }
        }
    }
}
