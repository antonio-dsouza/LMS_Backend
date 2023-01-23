import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
  );

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle)

export { usersRoutes };
