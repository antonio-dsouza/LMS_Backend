import { Router } from "express";

import { AuthenticateUserController } from "@modules/auth/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/auth/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/login", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
