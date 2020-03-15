import { GamePlayApiClient, IGamePlayModel, IMoveModel, MoveModel } from "../clients/clients";

export class GamePlayService {
    static async getGamePlayById(id: number): Promise<IGamePlayModel | null> {
        const client = new GamePlayApiClient();
        const model = await client.getById(id);

        return model;
    }

    static async move(id: number, model: IMoveModel): Promise<IMoveModel> {
        const client = new GamePlayApiClient();

        const postModel = new MoveModel(model);
        const newModel = await client.move(id, postModel);

        return newModel;
    }
}
