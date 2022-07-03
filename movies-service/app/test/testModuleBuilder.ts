import { INestApplication, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { Test, TestingModuleBuilder } from "@nestjs/testing";
import { initTestApp } from "@test/initTestApp";
import { testModuleMetadata } from "@test/testModuleMetadata";

import { configureMiddlewares } from "@app/api/middleware/configureMiddlewares";

@Module(testModuleMetadata)
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    configureMiddlewares(consumer);
  }
}

const testModuleBuilder: TestingModuleBuilder = Test.createTestingModule({ imports: [TestModule] });
let testApp: INestApplication | undefined = undefined;
export const getTestApp = async (): Promise<INestApplication> => {
  if (!testApp) {
    testApp = await initTestApp(await testModuleBuilder.compile());
  }
  return testApp;
};
