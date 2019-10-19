import { AccountApiClient, IUserModel } from "../clients/clients";
import { AppBootstrap } from "../components/shared/AppBootstrap";

export class AccountService {
    static async getAccount(): Promise<IUserModel | null> {
        const client = new AccountApiClient(AppBootstrap.baseUrl);
        const model = await client.get();

        return model;
    }
}