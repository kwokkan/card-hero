import { GameApiClient, GameCreateModel, GameTripleTriadMoveViewModel, IGameModel, IGameTripleTriadMoveViewModel, IGameUserModel, IGameViewModel, JoinGameViewModel } from "../clients/clients";

interface IGameSearchFilter {
    name?: string;
    activeOnly?: boolean;
    page?: number;
    pageSize?: number;
    gameId?: number;
}

export class GameService {
    static async getGameById(id: number): Promise<IGameViewModel | null> {
        const client = new GameApiClient();
        const model = await client.getById(id);

        return model;
    }

    static async getGames(filter?: IGameSearchFilter): Promise<IGameModel[] | null> {
        const client = new GameApiClient();

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
        const client = new GameApiClient();

        const newModel = await client.post(model);

        return newModel;
    }

    static async join(id: number, deckId: number): Promise<IGameUserModel> {
        const client = new GameApiClient();

        const postModel = new JoinGameViewModel({
            deckId: deckId
        });
        const model = await client.join(id, postModel);

        return model;
    }

    static async move(id: number, model: GameTripleTriadMoveViewModel): Promise<IGameTripleTriadMoveViewModel> {
        const client = new GameApiClient();
        const newModel = await client.move(id, model);

        return newModel;
    }
}