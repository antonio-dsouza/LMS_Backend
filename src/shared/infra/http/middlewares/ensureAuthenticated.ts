import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/prisma/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.userAuthenticated = user_id;

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
