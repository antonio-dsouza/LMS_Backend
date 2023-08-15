import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { institutionRoutes } from "./institutions.routes";
import { passwordRoutes } from "./password.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/", authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use("/institutions", institutionRoutes);

export { router };
