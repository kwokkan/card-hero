import IMapper from "../utils/mapper";
import CardModel from "./CardModel";

export default class DeckCardModel extends CardModel implements IMapper<DeckCardModel> {
    cardCollectionId: number;
    isUsable?: boolean = true;

    from(o?: any): DeckCardModel {
        if (!o) return this;

        super.from(o);

        this.cardCollectionId = o.cardCollectionId;
        //this.isUsable = o.isUsable;

        return this;
    }
}