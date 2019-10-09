import { CardCollectionModel, CollectionApiClient } from "../clients/clients";
import { AppBootstrap } from "../components/shared/AppBootstrap";

interface ICardCollectionSearchFilter {
    page?: number;
    pageSize?: number;
    ids?: number[];
}

export default class CardCollectionService {
    static async getCollection(filter?: ICardCollectionSearchFilter): Promise<CardCollectionModel[] | null> {
        const client = new CollectionApiClient(AppBootstrap.baseUrl);

        if (!filter) {
            filter = {};
        }

        const model = await client.get(
            filter.ids,
            filter.page,
            filter.pageSize
        );

        return model;
    }
}