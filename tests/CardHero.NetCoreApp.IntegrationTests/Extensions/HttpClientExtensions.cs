using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace System.Net.Http
{
    public static class HttpClientExtensions
    {
        public static Task<HttpResponseMessage> PatchJsonAsync(this HttpClient client, string requestUri, object model, CancellationToken cancellationToken = default)
        {
            var json = JsonSerializer.Serialize(model);

            var content = new StringContent(json, Text.Encoding.Default, "application/json");

            return client.PatchAsync(requestUri, content, cancellationToken);
        }

        public static Task<HttpResponseMessage> PostJsonAsync(this HttpClient client, string requestUri, object model, CancellationToken cancellationToken = default)
        {
            var json = JsonSerializer.Serialize(model);

            var content = new StringContent(json, Text.Encoding.Default, "application/json");

            return client.PostAsync(requestUri, content, cancellationToken);
        }
    }
}
