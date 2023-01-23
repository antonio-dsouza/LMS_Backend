import { Account } from "../entities/Account";
import prismaClient from "@shared/infra/prisma";
import { IAccountsRepository } from "@modules/application/repositories/IAccountsRepository";
import { ICreateAccountDTO } from "@modules/application/dtos/ICreateAccountDTO";

class AccountsRepository implements IAccountsRepository {
  async list(id: string): Promise<Account[]> {
    const accounts = await prismaClient.account.findMany({
      where: {
        userId: id,
      },
    });
    return accounts;
  }

  async save({
    name,
    email,
    password,
    id,
  }: ICreateAccountDTO): Promise<void> {
    await prismaClient.account.create({
      data: {
        name: name,
        email: email,
        password: password,
        user: {
          connect: {
            id: id
          }
        }
      }
    });
  }

  async findByName(name: string, id: string): Promise<Account> {
    const account = await prismaClient.account.findFirst({
      where: {
        name: name,
        userId: id
      },
    })
    return account;
  }

  async deleteAccountByName(name: string, id: string): Promise<void> {
    await prismaClient.account.deleteMany({
      where: {
        name: name,
        userId: id
      }
    })
  }
}

export { AccountsRepository };
