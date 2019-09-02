import IMapper from "../utils/mapper";
import CardModel from "./CardModel";

export default class CardCollectionModel implements IMapper<CardCollectionModel> {
    id: number;
    card: CardModel;

    from(o?: any): CardCollectionModel {
        if (!o) return this;

        this.id = o.cardCollectionId;

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