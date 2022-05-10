import {
  RoutingControllersOptions,
  useContainer,
  useExpressServer,
} from "routing-controllers";
import {
  ConnectionOptions,
  createConnection,
  useContainer as typeormUseContainer,
} from "typeorm";
import { Container as TypeormContainer } from "typeorm-typedi-extensions";

import { Container } from "typedi";
import path from "path";
import express from "express";

export const bootstrapApp = async (
  dbConnectionOptions: ConnectionOptions,
  migrate = false
) => {
  // register typedi extension container with typeorm
  // to allow custom repository injections
  typeormUseContainer(TypeormContainer);

  // register typedi container for service injection
  useContainer(Container);

  const conn = await createConnection(dbConnectionOptions);
  if (migrate) {
    await conn.runMigrations();
  }

  const appOptions: RoutingControllersOptions = {
    routePrefix: "/api",
    controllers: [path.join(`${__dirname}/controllers/*.{js,ts}`)],
    defaultErrorHandler: false,
    middlewares: [path.join(`${__dirname}/middlewares/*.{js,ts}`)],
  };
  let app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app = useExpressServer(app, appOptions);
  return {
    app,
    appOptions,
  };
};
