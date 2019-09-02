import AppBootstrap from "../components/shared/appBootstrap";
import AccountModel from "../models/AccountModel";

export default class AccountService {
    private static readonly baseUrl: string = AppBootstrap.baseUrl + 'api/account';

    static async getAccount(): Promise<AccountModel | null> {
        let baseUrl = AccountService.baseUrl;

        const response = await fetch(baseUrl);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        if (data) {
            return new AccountModel().from(data);
        }

        return null;
    }
}