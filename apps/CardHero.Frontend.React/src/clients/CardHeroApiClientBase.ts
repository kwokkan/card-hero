// used by NSwag generated api clients
export class CardHeroApiClientBase {
    static baseUrl: string;

    getBaseUrl(defaultBaseUrl: string, _: string): string {
        const baseUrl = CardHeroApiClientBase.baseUrl;

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
