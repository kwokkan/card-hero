import IMapper from "../utils/mapper";

export default class AccountModel implements IMapper<AccountModel> {
    identifier: string;
    fullName: string;
    coins: number;

    from(o?: any): AccountModel {
        this.coins = o.coins;
        this.fullName = o.fullName;
        this.identifier = o.identifier;

        return this;
    }
}