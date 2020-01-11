import { CardModel, GameMoveViewModel, ICardModel, IGameMoveViewModel } from "../clients/clients";
import { IMapper } from "../utils/mapper";

export class GameTripleTriadModel implements IMapper<GameTripleTriadModel> {
    columns: number;
    rows: number;
    moves: IGameMoveViewModel[];
    playedCards: ICardModel[];

    from(o?: any): GameTripleTriadModel {
        if (!o) return this;

        this.columns = o.columns;
        this.rows = o.rows;

        if (o.moves) {
            this.moves = o.moves.map((x: IGameMoveViewModel) => new GameMoveViewModel(x));
        }

        if (o.playedCards) {
            this.playedCards = o.playedCards.map((x: ICardModel) => new CardModel(x));
        }

        return this;
    }
}
