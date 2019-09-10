import AppBootstrap from "../components/shared/appBootstrap";
import CardCollectionModel, { CardCollectionId } from "../models/CardCollectionModel";

interface ICardCollectionSearchFilter {
    page?: number;
    pageSize?: number;
    ids?: CardCollectionId[];
}

export default class CardCollectionService {
    private static readonly baseUrl: string = AppBootstrap.baseUrl + 'api/collections';

    static async getCollection(filter?: ICardCollectionSearchFilter): Promise<CardCollectionModel[] | null> {
        let baseUrl = CardCollectionService.baseUrl;

        if (filter != null) {
            baseUrl += '?' + Object.keys(filter)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(filter[k]))
                .join('&');
        }

        const response = await fetch(baseUrl);
        const data = await response.json() as CardCollectionModel[];

        if (data) {
            return data.map(x => new CardCollectionModel().from(x));
        }

        return null;
    }
}