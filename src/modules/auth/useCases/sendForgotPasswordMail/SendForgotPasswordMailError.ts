import { AppError } from "@shared/errors/AppError";

export class SendForgotPasswordMailError extends AppError {
  constructor() {
    super("User does not exists!", 404);
  }
}
