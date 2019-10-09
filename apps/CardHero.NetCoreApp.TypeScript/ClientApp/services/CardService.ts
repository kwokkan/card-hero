import { CardApiClient, CardModel } from "../clients/clients";
import { AppBootstrap } from "../components/shared/AppBootstrap";

interface ICardSearchFilter {
    name?: string;
    page?: number;
    pageSize?: number;
    ids?: number[];
}

export class CardService {
    static async getCards(filter?: ICardSearchFilter): Promise<CardModel[] | null> {
        const client = new CardApiClient(AppBootstrap.baseUrl);
        const model = client.get(
            filter.ids,
            filter.name,
            filter.page,
            filter.pageSize
        );

        return model;
    }
}