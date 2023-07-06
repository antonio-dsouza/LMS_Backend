import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
  groups: any;
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
    const { sub: user_id, groups } = verify(token, auth.secret_token) as IPayload;

    request.userAuthenticated = Number(user_id);
    request.groups = groups;

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
