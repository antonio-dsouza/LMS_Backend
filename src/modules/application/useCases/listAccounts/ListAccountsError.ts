import { AppError } from "@shared/errors/AppError"; 

export namespace ListAccountsError {
export class NoHaveAcounts extends AppError {
    constructor() {
      super('The user no have accounts');
    }
  }
  export class UserNotFound extends AppError {
    constructor() {
      super('User not found', 404);
    }
  }
}