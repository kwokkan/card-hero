import { CardPackApiClient, ICardPackModel } from "../clients/clients";

export class CardPackService {
    static async getCardPacks(): Promise<ICardPackModel[] | null> {
        const client = new CardPackApiClient();
        const model = client.get();

        return model;
    }
}
