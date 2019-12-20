import { CollectionApiClient, ICardCollectionModel } from "../clients/clients";

interface ICardCollectionSearchFilter {
    name?: string;
    page?: number;
    pageSize?: number;
    ids?: number[];
}

export class CardCollectionService {
    static async getCollection(filter?: ICardCollectionSearchFilter): Promise<ICardCollectionModel[] | null> {
        const client = new CollectionApiClient();

        if (!filter) {
            filter = {};
        }

        const model = await client.get(
            filter.name,
            filter.ids,
            filter.page,
            filter.pageSize
        );

        return model;
    }
}
