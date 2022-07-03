import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TestingModule } from "@nestjs/testing/testing-module";
import * as express from "express";

import { GeneralExceptionFilter } from "@app/api/filter/GeneralExceptionFilter";
import { ValidationException } from "@app/exception/validation/ValidationException";
import { Configuration } from "@app/logic/service/configuration/Configuration";
import { Logger } from "@app/logic/service/logger/Logger";

export const initTestApp = async (module: TestingModule): Promise<INestApplication> => {
  const app = module.createNestApplication();
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: "exposeAll",
    })
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors) =>
        new ValidationException({ type: "validationError", data: validationErrors }),
      transform: true, // this ensures that objects are correctly converted into DTOs for example on @Query decorator
      transformOptions: {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        strategy: "excludeAll",
      },
    })
  );
  app.useGlobalFilters(new GeneralExceptionFilter(app.get<Configuration>(Configuration), app.get<Logger>(Logger)));
  app.use(express.json({ limit: 1048576 })); // 1024 * 1024
  app.useLogger(["error", "warn", "log", "debug", "verbose"]);

  await app.init();
  return app;
};
