import ormConfig from "@ormconfig";
import path from "path";
import { ConnectionOptions, createConnection } from "typeorm";
import {FixtureEntity, TypeormFixturesLoaderHelper} from "@app/logic/service/typeorm/TypeormFixturesLoaderHelper";


const testEnvOrmConfig = ormConfig.getConfig("test") as ConnectionOptions;

const DEFAULT_FIXTURES_PATH = "./test/helpers/fixtures/";

export interface CreatedFixtures {
  [key: string]: any; // eslint-disable-line
}

export const loadFixtures = async (
  fixturesPath: string = DEFAULT_FIXTURES_PATH
): Promise<Record<string, FixtureEntity>> => {
  let connection;
  try {
    connection = await createConnection({
      ...testEnvOrmConfig,
      dropSchema: true,
      migrationsRun: true,
      migrationsTransactionMode: "none",
    });
    return await TypeormFixturesLoaderHelper.load(path.resolve(fixturesPath));
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};
