import { GameTripleTriadMoveViewModel, IGameTripleTriadMoveViewModel } from "../clients/clients";
import { IMapper } from "../utils/mapper";

export class GameTripleTriadModel implements IMapper<GameTripleTriadModel> {
    columns: number;
    rows: number;
    moves: IGameTripleTriadMoveViewModel[];

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