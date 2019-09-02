import AppBootstrap from "../components/shared/appBootstrap";
import CardModel from "../models/CardModel";
import StoreItemModel from "../models/StoreItemModel";
import StoreItemModelMapper from "../models/StoreItemModelMapper";

export default class StoreService {
    private static readonly baseUrl: string = AppBootstrap.baseUrl + 'api/store';

    static async getStoreItems(): Promise<StoreItemModel[] | null> {
        const baseUrl = StoreService.baseUrl;

        const response = await fetch(baseUrl);
        const data = await response.json() as StoreItemModel[];

        if (data) {
            const mapper = new StoreItemModelMapper();
            return data.map(x => mapper.from(x));
        }

        return null;
    }

    static async buyCardBundle(id: number): Promise<CardModel[] | null> {
        const baseUrl = StoreService.baseUrl;

        const body = {
            id: id
        };

        const response = await fetch(baseUrl, {
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        });
        const data = await response.json() as CardModel[];

        if (data) {
            return data.map(x => new CardModel().from(x));
        }

        return null;
    }
}