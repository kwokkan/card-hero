import { DeckApiClient, DeckCreateModel, IDeckCreateModel, IDeckModel } from "../clients/clients";

interface IDeckSearchFilter {
    name?: string;
    page?: number;
    pageSize?: number;
    ids?: number[];
}

export class DeckService {
    static async getDeckById(id: number): Promise<IDeckModel> {
        const client = new DeckApiClient();

        const model = await client.getById(id);

        return model;
    }

    static async getDecks(filter?: IDeckSearchFilter): Promise<IDeckModel[] | null> {
        const client = new DeckApiClient();

        if (!filter) {
            filter = {};
        }

        const model = await client.get(
            filter.ids,
            filter.name,
            filter.page,
            filter.pageSize
        );

        return model;
    }

    static async createDeck(model: IDeckCreateModel): Promise<IDeckModel> {
        const client = new DeckApiClient();

        const postModel = new DeckCreateModel();
        postModel.name = model.name;
        postModel.description = model.description;

        var newModel = await client.create(postModel);

        return newModel;
    }
}
