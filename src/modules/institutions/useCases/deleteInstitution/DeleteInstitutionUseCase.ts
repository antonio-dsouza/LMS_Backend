import { IInstitutionsRepository } from "@modules/institutions/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

class DeleteInstitutionUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository
  ) {}
  async execute(id: number): Promise<void> {
    const institution = await this.institutionsRepository.findById(id);

    if (!institution) {
      throw new AppError("Institution not found", 500);
    }

    await this.institutionsRepository.deleteById(id);
  }
}

export { DeleteInstitutionUseCase };
