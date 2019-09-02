import AppBootstrap from "../components/shared/appBootstrap";
import GameCreateModel from "../models/GameCreateModel";
import GameModel from "../models/GameModel";
import GameTripleTriadMoveModel from "../models/GameTripleTrialMoveModel";

interface IGameSearchFilter {
    name?: string;
    activeOnly?: boolean;
    page?: number;
    pageSize?: number;
    gameId?: number;
}

export default class GameService {
    private static readonly baseUrl: string = AppBootstrap.baseUrl + 'api/games';

    static async getGameById(id: number) {
        let baseUrl = GameService.baseUrl + '/' + id;

        const response = await fetch(baseUrl);

        const data = await response.json() as GameModel;

        if (data) {
            return new GameModel().from(data);
        }

        return null;
    }

    static async getGames(filter?: IGameSearchFilter): Promise<GameModel[] | null> {
        let baseUrl = GameService.baseUrl;

        if (filter != null) {
            baseUrl += '?' + Object.keys(filter)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(filter[k]))
                .join('&');
        }

        const response = await fetch(baseUrl);
        const data = await response.json() as GameModel[];

        if (data) {
            return data.map(x => new GameModel().from(x));
        }

        return null;
    }

    static async createGame(model: GameCreateModel): Promise<GameModel> {
        let baseUrl = GameService.baseUrl;

        const response = await fetch(baseUrl, {
            body: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        });
        const data = await response.json() as GameModel;

        const newDeck = new GameModel().from(data);

        return newDeck;
    }

    static async move(id: number, model: GameTripleTriadMoveModel): Promise<GameTripleTriadMoveModel> {
        let baseUrl = GameService.baseUrl + '/' + id + '/move';

        const response = await fetch(baseUrl, {
            body: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        });
        const data = await response.json() as GameTripleTriadMoveModel;

        const newDeck = new GameTripleTriadMoveModel().from(data);

        return newDeck;
    }
}