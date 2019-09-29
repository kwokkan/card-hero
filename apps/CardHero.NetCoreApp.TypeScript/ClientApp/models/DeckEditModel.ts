import { CardCollectionModel } from "../clients/clients";
import DeckCardModel from "./DeckCardModel";
import DeckModel from "./DeckModel";

export default class DeckEditModel {
    deck: DeckModel;
    ownedCards: CardCollectionModel[];
    usedCards: DeckCardModel[];
}