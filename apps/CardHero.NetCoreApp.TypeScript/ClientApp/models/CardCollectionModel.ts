import IMapper from "../utils/mapper";
import CardModel from "./CardModel";

export interface CardCollectionId extends Number {
    _cardCollectionIdBrand: number;
}

export default class CardCollectionModel implements IMapper<CardCollectionModel> {
    id: CardCollectionId;
    card: CardModel;

    from(o?: any): CardCollectionModel {
        if (!o) return this;

        this.id = o.id;

        this.card = new CardModel();

        if (o.card) {
            this.card.from(o.card);
        }
        else {
            this.card.from(this);
        }

        return this;
    }
}