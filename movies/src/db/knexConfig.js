const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const validateEnvironmentVariables = () => {
  if (!POSTGRES_HOST) {
    throw new Error("Missing POSTGRES_HOST env var. Set it and restart the server");
  }
  if (!POSTGRES_USER) {
    throw new Error("Missing POSTGRES_USER env var. Set it and restart the server");
  }
  if (!POSTGRES_PASSWORD) {
    throw new Error("Missing POSTGRES_PASSWORD env var. Set it and restart the server");
  }
  if (!POSTGRES_DB) {
    throw new Error("Missing POSTGRES_DB env var. Set it and restart the server");
  }
};

validateEnvironmentVariables();

export default {
  client: "postgresql",
  connection: {
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './src/db/migrations',
    loadExtensions: ['.mjs']
  }
};
