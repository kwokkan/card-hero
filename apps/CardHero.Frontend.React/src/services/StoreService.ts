import { ICardCollectionModel, IStoreItemModel, StoreApiClient } from "../clients/clients";

export class StoreService {
    static async getStoreItems(): Promise<IStoreItemModel[] | null> {
        const client = new StoreApiClient();
        const model = await client.get();

        return model;
    }

    static async buyCardBundle(id: number): Promise<ICardCollectionModel[] | null> {
        const client = new StoreApiClient();

        const model = await client.buyStoreItem(id);

        return model;
    }
}
