using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using CardHero.NetCoreApp.TypeScript;

using Xunit;

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

            var failed = new List<string>(factories.Length);

            foreach (var factory in factories)
            {
                try
                {
                    await action(factory);
                }
                catch
                {
                    failed.Add(factory.ToString());
                }
            }

            if (failed.Any())
            {
                failed.Insert(0, callerMemberName);
            }

            Assert.Empty(failed);
        }
    }
}
