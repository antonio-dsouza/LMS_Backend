import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { UserMap } from "@modules/users/mapper/UserMap";

interface IRequestDTO {
  id: number;
  institution_id: number;
}

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }
  async execute({ id, institution_id }: IRequestDTO): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id, institution_id);
    
    if (!user) {
      throw new AppError("User no exists", 500);
    }

    const userReturn = UserMap.toDTO(user);

    return userReturn;
  }
}

export { GetUserUseCase };
