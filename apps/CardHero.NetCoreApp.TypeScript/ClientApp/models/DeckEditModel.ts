import { CardCollectionModel, DeckCardModel, DeckModel } from "../clients/clients";

export class DeckEditModel {
    deck: DeckModel;
    ownedCards: CardCollectionModel[];
    usedCards: DeckCardModel[];
}