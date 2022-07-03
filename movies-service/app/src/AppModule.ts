import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { configureMiddlewares } from "@app/api/middleware/configureMiddlewares";
import { appModuleControllers, appModuleImports, appModuleProviders } from "@app/appModuleMetadata";

@Module({
  controllers: appModuleControllers,
  providers: appModuleProviders,
  imports: [TypeOrmModule.forRoot(), ...appModuleImports],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    configureMiddlewares(consumer);
  }
}
