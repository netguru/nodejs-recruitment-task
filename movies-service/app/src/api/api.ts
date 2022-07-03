import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";

import { AppModule } from "@app/AppModule";
import { GeneralExceptionFilter } from "@app/api/filter/GeneralExceptionFilter";
import { ValidationException } from "@app/exception/validation/ValidationException";
import { Configuration } from "@app/logic/service/configuration/Configuration";
import { Logger } from "@app/logic/service/logger/Logger";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Accept", "Content-Type", "Authorization"],
    exposedHeaders: ["X-Count", "X-Last", "X-First", "X-Total", "X-Page", "X-PageSize", "X-Has-More"],
  });

  const config = new DocumentBuilder()
    .setTitle("Movies Service")
    .setDescription("An API to create movies...")
    .setVersion("1.0")
    .addBearerAuth({ in: "header", type: "http" })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/docs", app, document);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: "exposeAll",
    })
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors) =>
        new ValidationException({ type: "validationError", data: validationErrors }),
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        strategy: "excludeAll",
      },
    })
  );
  app.useGlobalFilters(new GeneralExceptionFilter(app.get<Configuration>(Configuration), app.get<Logger>(Logger)));
  app.use(express.json({ limit: 1048576 }));
  app.useLogger(["error", "warn", "log", "debug", "verbose"]);
  await app.listen(80);
}

bootstrap().then(() => "App listening on port 80");
