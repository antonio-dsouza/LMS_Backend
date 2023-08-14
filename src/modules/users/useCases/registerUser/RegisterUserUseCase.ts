import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { RegisterUserError } from "./RegisterUserError";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IRegisterUserDTO } from "@modules/users/dtos/IRegisterUserDTO";

interface IResponse {
  user: {
    id: number;
    email: string;
  }
}

@injectable()
class RegisterUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    ) {}
  async execute({  name,
    address,
    email,
    password,
    active,
    identification,
    image,
    phone,
    last_login,
    modality_id,
    course_id,
    pole_id,
    institution_id,
    group_id }: IRegisterUserDTO): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      email
    );

    if (userAlreadyExists) {
      throw new RegisterUserError();
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.save({ name,
      address,
      email,
      active,
      identification,
      image,
      phone,
      last_login,
      modality_id,
      course_id,
      pole_id,
      institution_id,
      group_id,
      password: hashedPassword});

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
