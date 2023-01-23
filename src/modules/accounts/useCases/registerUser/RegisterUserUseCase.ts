import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { RegisterUserError } from "./RegisterUserError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IRegisterUserDTO } from "@modules/accounts/dtos/IRegisterUserDTO";

interface IResponse {
  user: {
    id: string;
    email: string;
  }
}

@injectable()
class RegisterUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    ) {}
  async execute({ firstname, lastname, email, password }: IRegisterUserDTO): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      email
    );

    if (userAlreadyExists) {
      throw new RegisterUserError();
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.save({ firstname, lastname, email, password: hashedPassword});

    const userReturn: IResponse = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    return userReturn;
  }
}

export { RegisterUserUseCase };
