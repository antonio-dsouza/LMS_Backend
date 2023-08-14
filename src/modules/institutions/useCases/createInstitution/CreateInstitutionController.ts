import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateInstitutionUseCase } from "./CreateInstitutionUseCase";

class CreateInstitutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, cnpj } = request.body;

    if (!name || !description || !cnpj) {
      throw new AppError("Invalid params!");
    }

    const createInstitutionCase = container.resolve(CreateInstitutionUseCase);

    const token = await createInstitutionCase.execute({ name, description, cnpj });

    return response.json(token);
  }
}

export { CreateInstitutionController };
