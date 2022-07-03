import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from "@ormconfig";
import { ConnectionOptions } from "typeorm";

import { appModuleControllers, appModuleImports, appModuleProviders } from "@app/appModuleMetadata";

const testEnvOrmConfig = ormConfig.getConfig("test") as ConnectionOptions;

export const testModuleMetadata = {
  controllers: appModuleControllers,
  providers: appModuleProviders,
  imports: [TypeOrmModule.forRoot(testEnvOrmConfig), ...appModuleImports],
  exports: [],
};
