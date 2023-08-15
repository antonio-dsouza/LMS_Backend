import { CreateInstitutionController } from "@modules/institutions/useCases/createInstitution/CreateInstitutionController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { havePermission } from "../middlewares/havePermission";
import { DeleteInstitutionController } from "@modules/institutions/useCases/deleteInstitution/DeleteInstitutionController";

const institutionRoutes = Router();

const createInstitutionController = new CreateInstitutionController();
const deleteInstitutionController = new DeleteInstitutionController();

institutionRoutes.post("/", ensureAuthenticated, havePermission("institutions.create"), createInstitutionController.handle);
institutionRoutes.delete("/", ensureAuthenticated, havePermission("institutions.delete"), deleteInstitutionController.handle);

export { institutionRoutes };
