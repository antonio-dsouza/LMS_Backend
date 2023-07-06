import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/auth/dtos/IUserResponseDTO";
import { UserMap } from "@modules/auth/mapper/UserMap";
import { IUsersRepository } from "@modules/auth/repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
