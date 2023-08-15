import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteInstitutionUseCase } from "./DeleteInstitutionUseCase";

class DeleteInstitutionController {
  async handle(response: Response, request: Request): Promise<Response> {
    const { id } = request.body;

    const deleteInstitutionUseCase = container.resolve(
      DeleteInstitutionUseCase
    );

    deleteInstitutionUseCase.execute(id);

    return response.send();
  }
}

export { DeleteInstitutionController };
