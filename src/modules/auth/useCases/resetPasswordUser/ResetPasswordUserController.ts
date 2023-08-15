import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;
    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    if (!token || !password) {
      throw new AppError("Invalid params!");
    }

    await resetPasswordUserUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordUserController };
