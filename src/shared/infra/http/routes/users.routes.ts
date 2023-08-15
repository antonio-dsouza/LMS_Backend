import { Router } from "express";
// import multer from "multer";

// import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { GetUsersController } from "@modules/users/useCases/getUsers/GetUsersController";
import { GetUserController } from "@modules/users/useCases/getUser/GetUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";

const usersRoutes = Router();

// const uploadAvatar = multer(uploadConfig);

const getUsersController = new GetUsersController();
const getUserController = new GetUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.get("/", ensureAuthenticated, getUsersController.handle);
usersRoutes.get("/:id", ensureAuthenticated, getUserController.handle);
usersRoutes.post("/", ensureAuthenticated, createUserController.handle);
usersRoutes.patch("/:id", ensureAuthenticated, updateUserController.handle);
usersRoutes.delete("/:id", ensureAuthenticated, deleteUserController.handle);

export { usersRoutes };
