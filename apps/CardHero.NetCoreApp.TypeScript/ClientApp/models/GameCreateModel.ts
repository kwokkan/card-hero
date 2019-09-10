import { DeckId } from "./DeckModel";
import GameType from "./GameType";

export default class GameCreateModel {
    name: string;
    type: GameType;
    deckId: DeckId;
}