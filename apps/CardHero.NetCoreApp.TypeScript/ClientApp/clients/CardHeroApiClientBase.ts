// no export as this is used by NSwag generated api clients
class CardHeroApiClientBase {
    getBaseUrl(defaultBaseUrl: string, baseUrl: string): string {
        if (!baseUrl) {
            return defaultBaseUrl;
        }

        if (baseUrl.endsWith('/')) {
            // remove trailing slash as NSwag uses '/' as part of the api url
            return baseUrl.substring(0, baseUrl.length - 2);
        }

        return baseUrl;
    }
}

module.exports = CardHeroApiClientBase;