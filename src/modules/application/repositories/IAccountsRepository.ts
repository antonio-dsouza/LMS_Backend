import { ICreateAccountDTO } from "@modules/application/dtos/ICreateAccountDTO";
import { Account } from "@modules/application/infra/prisma/entities/Account";

interface IAccountsRepository {
  list(id: string): Promise<Account[]>;
  save({ name, email, password, id }: ICreateAccountDTO ): Promise<void>;
  findByName(name: string, id: string): Promise<Account>;
  deleteAccountByName(name: string, id: string): Promise<void>;
}

export { IAccountsRepository };
