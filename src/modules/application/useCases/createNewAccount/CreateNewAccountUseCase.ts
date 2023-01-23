import { inject, injectable } from "tsyringe";

import { CreateNewAccountError } from "./CreateNewAccountError";

import { IAccountsRepository } from "@modules/application/repositories/IAccountsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateAccountDTO } from "@modules/application/dtos/ICreateAccountDTO";

@injectable()
class CreateNewAccountUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}
  async execute({
    name,
    email,
    password,
    id,
  }: ICreateAccountDTO): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new CreateNewAccountError.UserNotFound();
    }

    const account = await this.accountsRepository.findByName(name, user.id);

    if (account) {
      throw new CreateNewAccountError.AccountAlreadyExists();
    }

    await this.accountsRepository.save({ name, email, password, id });
  }
}

export { CreateNewAccountUseCase };
