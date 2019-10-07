import { GameTripleTriadMoveViewModel } from "../clients/clients";
import IMapper from "../utils/mapper";

export default class GameTripleTriadModel implements IMapper<GameTripleTriadModel> {
    columns: number;
    rows: number;
    moves: GameTripleTriadMoveViewModel[];

    from(o?: any): GameTripleTriadModel {
        if (!o) return this;

        this.columns = o.columns;
        this.rows = o.rows;

        if (o.moves) {
            this.moves = o.moves.map(x => new GameTripleTriadMoveViewModel(x));
        }

        return this;
    }
}