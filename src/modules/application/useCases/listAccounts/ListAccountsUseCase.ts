import { inject, injectable } from "tsyringe";
import { Account } from "@modules/application/infra/prisma/entities/Account";

import { ListAccountsError } from "./ListAccountsError";

import { IAccountsRepository } from "@modules/application/repositories/IAccountsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    id: string;
}

@injectable()
class ListAccountsUseCase {
    constructor(
        @inject("AccountsRepository")
        private accountsRepository: IAccountsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
        ) {}
    async execute({ id }: IRequest): Promise<Account[]> {
        const user = await this.usersRepository.findById(id);
    
        if (!user) {
            throw new ListAccountsError.UserNotFound();
        }
    
        const accounts = await this.accountsRepository.list(id);
    
        if (!accounts)
        throw new ListAccountsError.NoHaveAcounts();

        return accounts;
    }
}

export { ListAccountsUseCase }