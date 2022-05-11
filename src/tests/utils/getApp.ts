import path from "path";
import { getConnection } from "typeorm";
import { bootstrapApp } from "../../bootstrapApp";

export const getApp = async () => {
  const dbFile = "netguru-test.db";
  const { app } = await bootstrapApp(
    {
      type: "sqlite",
      synchronize: true,
      database: dbFile,
      logging: false,
      entities: [path.join(__dirname, "../../models/**.{js,ts}")],
      migrations: [path.join(__dirname, "../../migrations/**.{js,ts}")],
    },
    true
  );
  return {
    app,
    teardown: async () => {
      await getConnection().close();
    },
    dbFile,
  };
};
