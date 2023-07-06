import { ICreateInstitutionDTO } from "@modules/institution/dtos/ICreateInstitutionDTO";
import {
  IInstitutionsRepository
} from "../../../repositories/IInstitutionsRepository";
import { Institution } from "../entities/Institution";
import prismaClient from "@shared/infra/prisma";

class InstitutionsRepository implements IInstitutionsRepository {
  async findById(id: number): Promise<Institution> {
    const institution = prismaClient.institution.findUnique({
      where: {
        id: id,
      },
    });
    return institution;
  }

  async save({ name, description, cnpj }: ICreateInstitutionDTO): Promise<Institution> {
    const institution = await prismaClient.institution.create({
      data: {
        name,
        description,
        cnpj
      },
    });
    return institution;
  }
}

export { InstitutionsRepository };
