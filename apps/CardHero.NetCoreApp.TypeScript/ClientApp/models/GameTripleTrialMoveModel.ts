import IMapper from "../utils/mapper";
import { CardCollectionId } from "./CardCollectionModel";

export default class GameTripleTriadMoveModel implements IMapper<GameTripleTriadMoveModel> {
    column?: number;
    row?: number;
    cardCollectionId?: CardCollectionId;

    from(o?: any): GameTripleTriadMoveModel {
        if (!o) return this;

        this.cardCollectionId = o.cardCollectionId;
        this.column = o.column;
        this.row = o.row;

        return this;
    }
}