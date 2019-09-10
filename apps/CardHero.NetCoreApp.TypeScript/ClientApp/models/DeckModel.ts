import IMapper from "../utils/mapper";
import DeckCardModel from "./DeckCardModel";

export interface DeckId extends Number {
    _deckIdBrand: number;
}

export default class DeckModel implements IMapper<DeckModel> {
    id: DeckId;
    name: string;
    description?: string;
    maxCards: number;
    isFavourited: boolean;
    cards: DeckCardModel[];

    from(o?: any): DeckModel {
        if (!o) return this;

        this.description = o.description;
        this.id = o.id;
        this.isFavourited = o.isFavourited;
        this.maxCards = o.maxCards;
        this.name = o.name;

        if (o.cards) {
            this.cards = o.cards.map(x => new DeckCardModel().from(x));
        }

        return this;
    }
}