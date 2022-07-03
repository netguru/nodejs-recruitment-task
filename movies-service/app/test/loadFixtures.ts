import ormConfig from "@ormconfig";
import path from "path";
import { Connection, createConnection } from "typeorm";

import { FixtureEntity, TypeormFixturesLoaderHelper } from "@app/logic/service/typeorm/TypeormFixturesLoaderHelper";

const testEnvOrmConfig = ormConfig.getConfig("test");

export interface CreatedFixtures {
  [key: string]: any; // eslint-disable-line
}

let connection: Connection | undefined = undefined;

export const loadFixtures = async (
  fixturesPath: string = "./test/helpers/fixtures/"
): Promise<Record<string, FixtureEntity>> => {
  try {
    if (!connection) {
      connection = await createConnection({
        ...testEnvOrmConfig,
        dropSchema: true,
        migrationsRun: true,
        migrationsTransactionMode: "none",
      });
    } else {
      await connection.dropDatabase();
      await connection.runMigrations({ transaction: "none" }); // mmm, speed
    }
    return await TypeormFixturesLoaderHelper.load(path.resolve(fixturesPath));
  } catch (e) {
    throw new Error("Database issue");
  }
};
