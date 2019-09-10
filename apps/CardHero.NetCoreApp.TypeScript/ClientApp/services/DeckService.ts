import AppBootstrap from "../components/shared/appBootstrap";
import DeckCreateModel from "../models/DeckCreateModel";
import DeckModel, { DeckId } from "../models/DeckModel";

interface IDeckSearchFilter {
    name?: string;
    page?: number;
    pageSize?: number;
    ids?: DeckId[];
}

export default class DeckService {
    private static readonly baseUrl: string = AppBootstrap.baseUrl + 'api/decks';

    static async getDecks(filter?: IDeckSearchFilter): Promise<DeckModel[] | null> {
        let baseUrl = DeckService.baseUrl;

        if (filter != null) {
            baseUrl += '?' + Object.keys(filter)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(filter[k]))
                .join('&');
        }

        const response = await fetch(baseUrl);
        const data = await response.json() as DeckModel[];

        if (data) {
            return data.map(x => new DeckModel().from(x));
        }

        return null;
    }

    static async createDeck(model: DeckCreateModel): Promise<DeckModel> {
        let baseUrl = DeckService.baseUrl;

        const response = await fetch(baseUrl, {
            body: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        });
        const data = await response.json() as DeckModel;

        const newDeck = new DeckModel().from(data);

        return newDeck;
    }
}