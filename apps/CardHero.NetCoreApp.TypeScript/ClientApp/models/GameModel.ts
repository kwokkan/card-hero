import IMapper from "../utils/mapper";
import DeckModel from "./DeckModel";
import GameTripleTriadModel from "./GameTripleTriadModel";
import GameType from "./GameType";

export type GameId = number; 

export default class GameModel implements IMapper<GameModel> {
    id: GameId;
    name: string;
    type: GameType;

    startTime: Date;

    deck: DeckModel;

    data: GameTripleTriadModel;

    maxUsers: number;

    canJoin: boolean;
    canPlay: boolean;

    from(o?: any): GameModel {
        if (!o) return this;

        this.id = o.id;
        this.name = o.name;
        this.type = o.type;
        this.startTime = new Date(o.startTime);

        this.maxUsers = o.maxUsers;

        this.canJoin = o.canJoin;
        this.canPlay = o.canPlay;

        if (o.data) {
            switch (this.type) {
                case GameType.TripleTriad:
                    this.data = new GameTripleTriadModel().from(o.data);
                    break;
            }
        }

        if (o.deck) {
            this.deck = new DeckModel().from(o.deck);
        }

        return this;
    }
}