import { AppError } from "@shared/errors/AppError"; 

export class DeleteAccountError extends AppError {
    constructor() {
      super('No accounts found with this name!', 404);
    }
  }
