import { AccountApiClient, IUserModel } from "../clients/clients";

export class AccountService {
    static async getAccount(): Promise<IUserModel | null> {
        const client = new AccountApiClient();
        const model = await client.get();

        return model;
    }
}