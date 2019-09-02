/**
 * Contains code to bootstrap React components.
 */
export default class AppBootstrap {
    /**
     * Base url of the app.
     */
    static readonly baseUrl: string = document.querySelector('base').getAttribute('href');

    /**
     * Default root element to bind to.
     */
    static readonly rootElement: HTMLElement = document.getElementById('root');

    /**
     * Creates an url based on the @baseUrl.
     * @param parts Relative parts of the link.
     */
    static url(...parts: (string | number)[]): string {
        return AppBootstrap.baseUrl + parts.join('/');
    }
}