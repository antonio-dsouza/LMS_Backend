import { IAccountsRepository } from "@modules/application/repositories/IAccountsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { DeleteAccountError } from "./DeleteAccountError";

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class DeleteAccountUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, id }: IRequest): Promise<void> {
    const account = await this.accountsRepository.findByName(name, id);

    if (!account) {
      throw new DeleteAccountError();
    }

    await this.accountsRepository.deleteAccountByName(name, id);
  }
}

export { DeleteAccountUseCase };
