import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersMap } from "@modules/users/mapper/UsersMap";

@injectable()
class GetUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }
  async execute(institution_id: number): Promise<IUserResponseDTO[]> {
    const users = await this.usersRepository.findAllUsers(institution_id);

    const usersReturn = UsersMap.toDTO(users);

    return usersReturn;
  }
}

export { GetUsersUseCase };
