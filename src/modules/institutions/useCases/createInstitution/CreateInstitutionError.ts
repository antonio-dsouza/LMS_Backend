import { AppError } from "@shared/errors/AppError";

export class CreateInstitutionError extends AppError {
  constructor() {
    super('Institution already exists', 500);
  }
}
