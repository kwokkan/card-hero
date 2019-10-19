import { GameApiClient, GameCreateModel, GameTripleTriadMoveViewModel, IGameModel, IGameTripleTriadMoveViewModel } from "../clients/clients";
import { AppBootstrap } from "../components/shared/AppBootstrap";

interface IGameSearchFilter {
    name?: string;
    activeOnly?: boolean;
    page?: number;
    pageSize?: number;
    gameId?: number;
}

export class GameService {
    static async getGameById(id: number): Promise<IGameModel | null> {
        const client = new GameApiClient(AppBootstrap.baseUrl);
        const model = await client.getById(id);

        return model;
    }

    static async getGames(filter?: IGameSearchFilter): Promise<IGameModel[] | null> {
        const client = new GameApiClient(AppBootstrap.baseUrl);

        if (!filter) {
            filter = {};
        }

        const model = await client.get(
            filter.gameId,
            filter.name,
            undefined,
            undefined,
            undefined,
            filter.activeOnly,
            undefined,
            filter.page,
            filter.pageSize,
            undefined
        );

        return model;
    }

    static async createGame(model: GameCreateModel): Promise<IGameModel> {
        const client = new GameApiClient(AppBootstrap.baseUrl);

        const newModel = await client.post(model);

        return newModel;
    }

    static async move(id: number, model: GameTripleTriadMoveViewModel): Promise<IGameTripleTriadMoveViewModel> {
        const client = new GameApiClient(AppBootstrap.baseUrl);
        const newModel = await client.move(id, model);

        return newModel;
    }
}