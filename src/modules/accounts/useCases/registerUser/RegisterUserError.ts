import { AppError } from "@shared/errors/AppError";


export class RegisterUserError extends AppError {
  constructor() {
    super('User already exists', 500);
  }
}
