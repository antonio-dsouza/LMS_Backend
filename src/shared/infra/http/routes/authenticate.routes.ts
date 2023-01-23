import { Router } from "express";

import { RegisterUserController } from "@modules/accounts/useCases/registerUser/RegisterUserController";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const registerUserController = new RegisterUserController();
const authenticateUserUseCase = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/register", registerUserController.handle);
authenticateRoutes.post("/login", authenticateUserUseCase.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
