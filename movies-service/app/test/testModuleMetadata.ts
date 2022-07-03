import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfig from "@ormconfig";

import { appModuleControllers, appModuleImports, appModuleProviders } from "@app/appModuleMetadata";

const testEnvOrmConfig = ormConfig.getConfig("test");

export const testModuleMetadata = {
  controllers: appModuleControllers,
  providers: appModuleProviders,
  imports: [TypeOrmModule.forRoot(testEnvOrmConfig), ...appModuleImports],
  exports: [],
};
