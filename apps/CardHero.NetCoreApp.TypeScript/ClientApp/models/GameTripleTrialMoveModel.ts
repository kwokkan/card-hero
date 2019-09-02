import IMapper from "../utils/mapper";

export default class GameTripleTriadMoveModel implements IMapper<GameTripleTriadMoveModel> {
    column?: number;
    row?: number;
    cardCollectionId?: number;

    from(o?: any): GameTripleTriadMoveModel {
        if (!o) return this;

        this.cardCollectionId = o.cardCollectionId;
        this.column = o.column;
        this.row = o.row;

        return this;
    }
}