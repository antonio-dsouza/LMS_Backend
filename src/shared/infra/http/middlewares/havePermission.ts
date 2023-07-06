import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

export const havePermission =
  (routePermission: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new AppError("Token missing!", 401);
    }

    const user = req.user; // Supondo que você tenha um objeto de usuário na solicitação

    if (checkPermissions(user.groups, routePermission)) {
      next();
    } else {
      throw new AppError("Not authorized!", 401);
    }
  };

  async function checkPermissions(userGroups: string[], routePermission: string): Promise<boolean> {
    for (const group of userGroups) {
      const permissions = await getPermissionsForGroup(group);
      if (permissions && permissions.includes(routePermission)) {
        return true;
      }
    }
    return false;
  }
