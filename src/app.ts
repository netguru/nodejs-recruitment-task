// shim required for routing-controllers
import "reflect-metadata";

// load env variables
import { config } from "dotenv-safe";

config();

import { getConnectionOptions } from "typeorm";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from "swagger-ui-express";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import log from "loglevel";
import { getMetadataArgsStorage } from "routing-controllers";
import { __prod__ } from "./constants";
import { bootstrapApp } from "./bootstrapApp";
log.setDefaultLevel(__prod__ ? "ERROR" : "DEBUG");

const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

async function run() {
  const conn = await getConnectionOptions();
  const { app, appOptions } = await bootstrapApp(
    {
      ...conn,
      synchronize: !__prod__,
    },
    // run migrations by default on development/test env
    !__prod__
  );
  // Parse class-validator classes into JSON Schema:
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: "#/components/schemas/",
  });
  // Parse routing-controllers classes into OpenAPI spec:
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, appOptions, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          name: "jwt",
          bearerFormat: "JWT",
          scheme: "bearer",
        },
      },
    },
    info: {
      description: "Swagger docs for Netguru Node.js Assignment.",
      title: "Netguru Node.js API docs",
      version: "1.0.0",
    },
  });
  app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

  app.listen(+process.env.PORT, () => {
    log.info(`listening at http://localhost:${process.env.PORT}`);
  });
}

run().catch((err) => {
  log.error(err);
});
