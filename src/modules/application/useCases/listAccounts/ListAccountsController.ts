import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAccountsUseCase } from "./ListAccountsUseCase";

class ListAccountsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.userAuthenticated;

    const listAccountsUseCase = container.resolve(ListAccountsUseCase);

    const accounts = await listAccountsUseCase.execute({ id });

    return response.status(201).send(accounts);
  }
}

export { ListAccountsController };
