/*
 * @jest-environment jsdom
 */
import { AccountApiClient, UserModel } from "../clients/clients";
import { AccountService } from "./AccountService";

test("User id is obtained when logged in", async () => {
    jest.spyOn(AccountApiClient.prototype, "get")
        .mockImplementationOnce(
            () => new Promise(
                (resolve) => resolve(
                    new UserModel({
                        id: 1
                    })
                )
            )
        );

    const result = await AccountService.getAccount();

    expect(result.id).toBe(1);
});

test("User name is obtained when logged in", async () => {
    jest.spyOn(AccountApiClient.prototype, "get")
        .mockImplementationOnce(
            () => new Promise(
                (resolve) => resolve(
                    new UserModel({
                        id: 2,
                        fullName: "test"
                    })
                )
            )
        );

    const result = await AccountService.getAccount();

    expect(result.fullName).toBe("test");
});
