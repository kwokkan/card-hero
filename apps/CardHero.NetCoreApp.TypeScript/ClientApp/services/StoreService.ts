import { CardCollectionModel, StoreApiClient, StoreItemModel } from "../clients/clients";
import AppBootstrap from "../components/shared/appBootstrap";

export default class StoreService {
    static async getStoreItems(): Promise<StoreItemModel[] | null> {
        const client = new StoreApiClient(AppBootstrap.baseUrl);
        const model = await client.get();

        return model;
    }

    static async buyCardBundle(id: number): Promise<CardCollectionModel[] | null> {
        const client = new StoreApiClient(AppBootstrap.baseUrl);

        const postModel = new StoreItemModel({
            id: id
        });
        const model = await client.buyStoreItem(postModel);

        return model;
    }
}