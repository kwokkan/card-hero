import { GameApiClient, GameCreateModel, GameModel, GameTripleTriadMoveViewModel, GameUserModel, JoinGameViewModel } from "../clients/clients";
import { AppBootstrap } from "../components/shared/appBootstrap";

interface IGameSearchFilter {
    name?: string;
    activeOnly?: boolean;
    page?: number;
    pageSize?: number;
    gameId?: number;
}

export class GameService {
    static async getGameById(id: number): Promise<GameModel | null> {
        const client = new GameApiClient(AppBootstrap.baseUrl);
        const model = await client.getById(id);

        return model;
    }

    static async getGames(filter?: IGameSearchFilter): Promise<GameModel[] | null> {
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

    static async createGame(model: GameCreateModel): Promise<GameModel> {
        const client = new GameApiClient(AppBootstrap.baseUrl);

        const newModel = await client.post(model);

        return newModel;
    }

    static async join(id: number, deckId: number): Promise<GameUserModel> {
        const client = new GameApiClient(AppBootstrap.baseUrl);

        const postModel = new JoinGameViewModel({
            deckId: deckId
        });
        const model = await client.join(id, postModel);

        return model;
    }

    static async move(id: number, model: GameTripleTriadMoveViewModel): Promise<GameTripleTriadMoveViewModel> {
        const client = new GameApiClient(AppBootstrap.baseUrl);
        const newModel = await client.move(id, model);

        return newModel;
    }
}