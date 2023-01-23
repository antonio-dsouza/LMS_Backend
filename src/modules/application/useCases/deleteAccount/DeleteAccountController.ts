import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAccountUseCase } from "./DeleteAccountUseCase";

class DeleteAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    if(!name) {
        return response.status(400).send({
          message: (`One or more parameters are required!`),
        });
}

    const id = request.userAuthenticated;

    const deleteAccountUseCase = container.resolve(DeleteAccountUseCase);

    try {
      await deleteAccountUseCase.execute({ name, id });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).send({
        message: err.message || "Unexpected error.",
      });
    }
  }
}

export { DeleteAccountController };
