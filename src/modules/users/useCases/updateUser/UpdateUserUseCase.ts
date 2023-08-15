import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }
  async execute({
    id,
    name,
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
    group_id
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.usersRepository.findById(id);
    
    if (!user) {
      throw new AppError("User no exists", 500);
    }
    
    const emailHasUser = await this.usersRepository.findByEmail(email);
    
    if (emailHasUser) {
      throw new AppError("There is already a user with the email");
    }
    
    if (password) {
      password = await hash(password, 10);
    }

    await this.usersRepository.updateUser({
      id,
      name,
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
      group_id
    });
  }
}

export { UpdateUserUseCase };
