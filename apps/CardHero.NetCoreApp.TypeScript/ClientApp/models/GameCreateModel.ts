import { GameType } from "../clients/clients";
import { DeckId } from "./DeckModel";

export default class GameCreateModel {
    name: string;
    type: GameType;
    deckId: DeckId;
}