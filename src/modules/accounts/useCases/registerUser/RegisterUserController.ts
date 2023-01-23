import { Request, Response } from "express";
import { container } from "tsyringe";

import { RegisterUserUseCase } from "./RegisterUserUseCase";

class RegisterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, firstname, lastname } = request.body;

    const registerUserUseCase = container.resolve(RegisterUserUseCase);

    const result = await registerUserUseCase.execute({ email, password, firstname, lastname });

    return response.json(result);
  }
}

export { RegisterUserController };
