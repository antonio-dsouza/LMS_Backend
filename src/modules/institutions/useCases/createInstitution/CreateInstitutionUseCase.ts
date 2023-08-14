import { ICreateInstitutionDTO } from "@modules/institutions/dtos/ICreateInstitutionDTO";
import { Institution } from "@modules/institutions/infra/prisma/entities/Institution";
import { IInstitutionsRepository } from "@modules/institutions/repositories/IInstitutionsRepository";
import { inject, injectable } from "tsyringe";

import { CreateInstitutionError } from "./CreateInstitutionError";

@injectable()
class CreateInstitutionUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository
  ) {}
  async execute({
    name,
    description,
    cnpj,
  }: ICreateInstitutionDTO): Promise<Institution> {
    const institutionAlreadyExists =
      await this.institutionsRepository.findByCnpj(cnpj);

    if (institutionAlreadyExists) {
      throw new CreateInstitutionError();
    }

    const institution = await this.institutionsRepository.save({
      name,
      description,
      cnpj,
    });

    return institution;
  }
}

export { CreateInstitutionUseCase };
