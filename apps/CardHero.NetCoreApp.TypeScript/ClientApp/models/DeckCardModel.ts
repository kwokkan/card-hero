import { CardModel } from "../clients/clients";
import IMapper from "../utils/mapper";

export default class DeckCardModel extends CardModel implements IMapper<DeckCardModel> {
    cardCollectionId: number;
    isUsable?: boolean = true;

    from(o?: any): DeckCardModel {
        if (!o) return this;

        super.init(o);

        this.cardCollectionId = o.cardCollectionId;
        //this.isUsable = o.isUsable;

        return this;
    }
}