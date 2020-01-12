using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using Xunit;

namespace CardHero.NetCoreApp.IntegrationTests
{
    public abstract class IntegrationTestBase
    {
        private readonly List<BaseWebApplicationFactory> _factories = new List<BaseWebApplicationFactory>();

        public IntegrationTestBase(PostgreSqlWebApplicationFactory postgresAplicationFactory, SqlServerWebApplicationFactory sqlServerAplicationFactory)
        {
            _factories.Add(postgresAplicationFactory);
            _factories.Add(sqlServerAplicationFactory);
        }

        protected async Task RunAsync(Func<BaseWebApplicationFactory, Task> action, [CallerMemberName]string callerMemberName = "")
        {
            var failed = new List<string>(_factories.Count);

            foreach (var factory in _factories)
            {
                await factory.ResetDataAsync();

                try
                {
                    await action(factory);
                }
                catch (Exception e)
                {
                    failed.Add(factory.ToString());
                    failed.Add(e.Message);
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
