import { Router } from "express";

import { AuthenticateUserController } from "@modules/auth/useCases/authenticateUser/AuthenticateUserController";
import { RegisterUserController } from "@modules/users/useCases/registerUser/RegisterUserController";
import { RefreshTokenController } from "@modules/auth/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/register", registerUserController.handle);
authenticateRoutes.post("/login", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
