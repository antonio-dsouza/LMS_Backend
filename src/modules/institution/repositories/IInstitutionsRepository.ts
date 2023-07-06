import { ICreateInstitutionDTO } from "../dtos/ICreateInstitutionDTO";
import { Institution } from "../infra/prisma/entities/Institution";

interface IInstitutionsRepository {
  findById(id: number): Promise<Institution>;
  save({ name, description, cnpj }: ICreateInstitutionDTO ): Promise<Institution>;
}

export { IInstitutionsRepository };
