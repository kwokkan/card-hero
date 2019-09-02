import AppBootstrap from "../components/shared/appBootstrap";
import CardModel from "../models/CardModel";

interface ICardSearchFilter {
    name?: string;
    page?: number;
    pageSize?: number;
    ids?: number[];
}

export default class CardService {
    private static readonly baseUrl: string = AppBootstrap.baseUrl + 'api/cards';

    static async getCards(filter?: ICardSearchFilter): Promise<CardModel[] | null> {
        let baseUrl = CardService.baseUrl;

        if (filter != null) {
            baseUrl += '?' + Object.keys(filter)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(filter[k]))
                .join('&');
        }

        const response = await fetch(baseUrl);
        const data = await response.json() as CardModel[];

        if (data) {
            return data.map(x => new CardModel().from(x));
        }

        return null;
    }
}