import { TypeOrmModule } from "@nestjs/typeorm";

import { default as Controllers } from "@app/api/controller";
import { default as Presenters } from "@app/api/presenter";
import { default as Entities } from "@app/db/entity";
import { default as Repositories } from "@app/db/repository";
import { default as Services } from "@app/logic/service";
import { default as UseCases } from "@app/logic/use-case";

export const appModuleProviders = [...Presenters, ...UseCases, ...Services];

export const appModuleImports = [TypeOrmModule.forFeature([...Entities, ...Repositories])];

export const appModuleControllers = Controllers;
