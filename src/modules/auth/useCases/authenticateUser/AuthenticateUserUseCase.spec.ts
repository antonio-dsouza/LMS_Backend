import { IRegisterUserDTO } from "@modules/auth/dtos/IRegisterUserDTO";
import { UsersRepositoryInMemory } from "@modules/auth/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/auth/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { RegisterUserUseCase } from "../registerUser/RegisterUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectUserOrPasswordError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let registerUserUseCase: RegisterUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    registerUserUseCase = new RegisterUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to authenticate an user", async () => {
    const user: IRegisterUserDTO = {
      firstname: "Test",
      lastname: "User",
      email: "test@safebank.com",
      password: "1234",
    };

    await registerUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: "test@safebank.com",
      password: "1234",
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an user with invalid password", async () => {
    const user: IRegisterUserDTO = {
      firstname: "Test",
      lastname: "User",
      email: "test@safebank.com",
      password: "1234",
    };

    await registerUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "test@safebank.com",
        password: "12345",
      })
    ).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "test@safebank.com",
        password: "12345",
      })
    ).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
});
