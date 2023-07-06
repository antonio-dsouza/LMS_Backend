import { CreateInstitutionController } from "@modules/institutions/useCases/createInstitution/CreateInstitutionController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { havePermission } from "../middlewares/havePermission";

const institutionRoutes = Router();

const createInstitutionController = new CreateInstitutionController();

institutionRoutes.post("/create", ensureAuthenticated, havePermission("institutions.create"), createInstitutionController.handle);

export { institutionRoutes };
