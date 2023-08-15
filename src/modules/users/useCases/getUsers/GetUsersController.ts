import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUsersUseCase } from "./GetUsersUseCase";

class GetUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { institution_id } = request.body;
    
    if (!institution_id) {
      throw new AppError("Invalid params!");
    }

    const registerUserUseCase = container.resolve(GetUsersUseCase);

    const result = await registerUserUseCase.execute(institution_id);

    return response.json(result);
  }
}

export { GetUsersController };
