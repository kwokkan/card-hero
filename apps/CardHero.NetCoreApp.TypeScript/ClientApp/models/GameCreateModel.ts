import { GameType } from "../clients/clients";

export default class GameCreateModel {
    name: string;
    type: GameType;
    deckId: number;
}