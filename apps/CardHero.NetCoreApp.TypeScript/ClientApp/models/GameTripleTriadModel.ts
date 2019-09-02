import IMapper from "../utils/mapper";
import GameTripleTriadMoveModel from "./GameTripleTrialMoveModel";

export default class GameTripleTriadModel implements IMapper<GameTripleTriadModel> {
    columns: number;
    rows: number;
    moves: GameTripleTriadMoveModel[];

    from(o?: any): GameTripleTriadModel {
        if (!o) return this;

        this.columns = o.columns;
        this.rows = o.rows;

        if (o.moves) {
            this.moves = o.moves.map(x => new GameTripleTriadMoveModel().from(x));
        }

        return this;
    }
}