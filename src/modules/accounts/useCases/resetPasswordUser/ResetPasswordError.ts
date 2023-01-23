import { AppError } from "@shared/errors/AppError";


export namespace ResetPasswordError {
  export class TokenInvalid extends AppError {
    constructor() {
      super('Token invalid!', 401);
    }
  }

  export class TokenExpired extends AppError {
    constructor() {
      super('Token expired!', 401);
    }
  }

  export class PasswordConfirmationFailed extends AppError {
    constructor() {
      super('Password confirmation failed!', 401);
    }
  }
}
