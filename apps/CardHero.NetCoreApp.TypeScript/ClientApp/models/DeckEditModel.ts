import { CardCollectionModel, DeckCardModel, DeckModel } from "../clients/clients";

export default class DeckEditModel {
    deck: DeckModel;
    ownedCards: CardCollectionModel[];
    usedCards: DeckCardModel[];
}