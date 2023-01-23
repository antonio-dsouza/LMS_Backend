import { Router } from "express";
import { applicationRoutes } from "./application.routes";

import { authenticateRoutes } from "./authenticate.routes";
import { passwordRoutes } from "./password.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/", usersRoutes);
router.use("/", authenticateRoutes);
router.use("/", applicationRoutes);
router.use("/password", passwordRoutes);

export { router };
