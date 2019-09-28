import { Rarity } from "../clients/clients";
import IMapper from "../utils/mapper";

export interface CardId extends Number {
    _cardIdBrand: number;
}

export default class CardModel implements IMapper<CardModel> {
    id: CardId;
    name: string;

    health: number;
    attack: number;
    upAttack: number;
    rightAttack: number;
    downAttack: number;
    leftAttack: number;
    defence: number;
    totalStats: number;

    rarity: Rarity;

    // available to logged in users
    isFavourited?: boolean;

    from(o?: any): CardModel {
        if (!o) return this;

        this.attack = o.attack;
        this.defence = o.defence;
        this.downAttack = o.downAttack;
        this.health = o.health;
        this.id = o.id;
        this.leftAttack = o.leftAttack;
        this.name = o.name;
        this.rightAttack = o.rightAttack;
        this.totalStats = o.totalStats;
        this.upAttack = o.upAttack;
        this.rarity = o.rarity;

        this.isFavourited = o.isFavourited;

        return this;
    }
}