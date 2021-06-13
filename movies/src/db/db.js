import knex from "knex";
import knexConfig from "./knexConfig.js"

const db = knex(knexConfig);

const migrate = async () => {
    console.log("Checking for knex migrations...");
    return await db.migrate.latest();
};

await migrate();

export default db;