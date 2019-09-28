import { CardModel } from "../clients/clients";
import IMapper from "../utils/mapper";

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
            this.card.init(o.card);
        }
        else {
            this.card.init(this);
        }

        return this;
    }
}