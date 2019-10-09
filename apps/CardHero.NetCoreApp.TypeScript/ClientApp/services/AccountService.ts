import { AccountApiClient, UserModel } from "../clients/clients";
import { AppBootstrap } from "../components/shared/AppBootstrap";

export default class AccountService {
    static async getAccount(): Promise<UserModel | null> {
        const client = new AccountApiClient(AppBootstrap.baseUrl);
        const model = await client.get();

        return model;
    }
}