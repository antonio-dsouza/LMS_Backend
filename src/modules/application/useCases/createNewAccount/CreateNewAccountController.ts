import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateNewAccountUseCase } from "./CreateNewAccountUseCase";

class CreateNewAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const id = request.userAuthenticated;

    const createNewAccountUseCase = container.resolve(CreateNewAccountUseCase);

    await createNewAccountUseCase.execute({ name, email, password, id });

    return response.status(201).send();
  }
}

export { CreateNewAccountController };
