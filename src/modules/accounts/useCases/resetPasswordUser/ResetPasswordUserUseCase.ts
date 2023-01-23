import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ResetPasswordError } from "./ResetPasswordError";

interface IRequest {
  token: string;
  password: string;
  passwordconfirmation: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password, passwordconfirmation }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new ResetPasswordError.TokenInvalid();
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new ResetPasswordError.TokenExpired();
    }

    if (password !== passwordconfirmation) {
      throw new ResetPasswordError.PasswordConfirmationFailed();
    }

    const hashPassword = await hash(password, 10);

    await this.usersRepository.updatePassword(hashPassword, userToken.userId);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
