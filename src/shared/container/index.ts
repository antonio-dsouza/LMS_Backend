import { container } from "tsyringe";

import "@shared/container/providers";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { IInstitutionsRepository } from "@modules/institutions/repositories/IInstitutionsRepository";
import { InstitutionsRepository } from "@modules/institutions/infra/prisma/repositories/InstitutionsRepository";
import { IUsersTokensRepository } from "@modules/auth/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/auth/infra/typeorm/repositories/UsersTokensRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IInstitutionsRepository>(
  "InstitutionsRepository",
  InstitutionsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);