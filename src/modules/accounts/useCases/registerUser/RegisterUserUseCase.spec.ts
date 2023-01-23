import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { RegisterUserError } from "./RegisterUserError";
import { RegisterUserUseCase } from "./RegisterUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let registerUserUseCase: RegisterUserUseCase;

describe("Register User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        registerUserUseCase = new RegisterUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to register a new user", async () => {
        const user = await registerUserUseCase.execute({
            firstname: "Test",
            lastname: "User",
            email: "test@safebank.com",
            password: "1234",
        });

        expect(user).toHaveProperty("user");
    });

    it("should not be able to register a new user with a existent email", async () => {
        expect(async () => {
            await usersRepositoryInMemory.save({
                firstname: "Test",
                 lastname: "User",
                 email: "test@safebank.com",
                 password: "1234",
            });

            await registerUserUseCase.execute({
                firstname: "Test",
                lastname: "User",
                email: "test@safebank.com",
                password: "1234",
            })
        }).rejects.toBeInstanceOf(RegisterUserError);
    });
});