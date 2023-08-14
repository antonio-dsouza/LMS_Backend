import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { RegisterUserUseCase } from "./RegisterUserUseCase";

class RegisterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      address,
      email,
      password,
      active,
      identification,
      image,
      phone,
      last_login,
      modality_id,
      course_id,
      pole_id,
      institution_id,
      group_id,
    } = request.body;

    if (!name || !email || !password || !institution_id || !group_id) {
      throw new AppError("Invalid params!");
    }

    const registerUserUseCase = container.resolve(RegisterUserUseCase);

    const result = await registerUserUseCase.execute({
      name,
      address,
      email,
      password,
      active,
      identification,
      image,
      phone,
      last_login,
      modality_id,
      course_id,
      pole_id,
      institution_id,
      group_id,
    });

    return response.json(result);
  }
}

export { RegisterUserController };
