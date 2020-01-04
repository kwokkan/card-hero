import { CardApiClient, ICardModel } from "../clients/clients";

interface ICardSearchFilter {
    name?: string;
    cardPackId?: number;
    page?: number;
    pageSize?: number;
    ids?: number[];
}

export class CardService {
    static favouriteCard(id: number): Promise<void> {
        const client = new CardApiClient();

        return client.favourite(id);
    }

    static async getCards(filter?: ICardSearchFilter): Promise<ICardModel[] | null> {
        const client = new CardApiClient();
        const model = client.get(
            filter.ids,
            filter.name,
            filter.cardPackId,
            filter.page,
            filter.pageSize
        );

        return model;
    }
}
