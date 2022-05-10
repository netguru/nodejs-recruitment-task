// shim required for routing-controllers
import "reflect-metadata";

// load env variables
import { config } from "dotenv-safe";

config();

import { getConnectionOptions } from "typeorm";
import log from "loglevel";
import { __prod__ } from "./constants";
import { bootstrapApp } from "./bootstrapApp";

log.setDefaultLevel(__prod__ ? "ERROR" : "DEBUG");

async function run() {
  const conn = await getConnectionOptions();
  const { app } = await bootstrapApp(
    {
      ...conn,
      synchronize: !__prod__,
    },
    // run migrations by default on development/test env
    !__prod__
  );

  app.listen(+process.env.PORT, () => {
    log.info(`listening at http://localhost:${process.env.PORT}`);
  });
}

run().catch((err) => {
  log.error(err);
});
