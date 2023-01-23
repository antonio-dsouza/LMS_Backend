import { CreateNewAccountController } from "@modules/application/useCases/createNewAccount/CreateNewAccountController";
import { DeleteAccountController } from "@modules/application/useCases/deleteAccount/DeleteAccountController";
import { ListAccountsController } from "@modules/application/useCases/listAccounts/ListAccountsController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const applicationRoutes = Router();

const createNewAccountController = new CreateNewAccountController();
const listAccountsController = new ListAccountsController();
const deleteAccountController = new DeleteAccountController();

applicationRoutes.post("/create-account", ensureAuthenticated, createNewAccountController.handle);
applicationRoutes.get("/list-accounts", ensureAuthenticated, listAccountsController.handle);
applicationRoutes.post("/delete-account", ensureAuthenticated, deleteAccountController.handle);

export { applicationRoutes };