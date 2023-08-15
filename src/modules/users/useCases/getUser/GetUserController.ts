import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { institution_id } = request.body;
    
    if (!id || !institution_id) {
      throw new AppError("Invalid params!");
    }

    const getUserUseCase = container.resolve(GetUserUseCase);

    const result = await getUserUseCase.execute({ id: parseInt(id), institution_id });

    return response.json(result);
  }
}

export { GetUserController };
