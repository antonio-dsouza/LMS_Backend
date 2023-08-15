import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequestDTO {
  id: number;
  institution_id: number;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }
  async execute({ id, institution_id } :IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(id, institution_id);
    
    if (!user) {
      throw new AppError("User no exists", 500);
    }

    await this.usersRepository.deleteUser(id, institution_id);
  }
}

export { DeleteUserUseCase };
