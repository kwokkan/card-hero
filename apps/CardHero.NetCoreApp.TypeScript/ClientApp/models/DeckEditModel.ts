import { ICardCollectionModel, IDeckCardModel, IDeckModel } from "../clients/clients";

export class DeckEditModel {
    deck: IDeckModel;
    ownedCards: ICardCollectionModel[];
    usedCards: IDeckCardModel[];
}