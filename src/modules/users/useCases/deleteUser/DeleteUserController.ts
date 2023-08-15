import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { institution_id } = request.body;

    if (!id || !institution_id) {
      throw new AppError("Invalid params!");
    }

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute({ id: parseInt(id), institution_id });

    return response.send();
  }
}

export { DeleteUserController };
