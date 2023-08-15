import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

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
      group_id
    } = request.body;

    if (!id) {
      throw new AppError("Invalid params!");
    }

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      id: parseInt(id),
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
      group_id
    });

    return response.send();
  }
}

export { UpdateUserController };
