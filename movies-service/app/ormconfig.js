// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/naming-convention
const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

// Default configuration
const config = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  keepConnectionAlive: true,
  synchronize: false,
  logging: ["migration", "error"],
  entities: ["dist/db/entity/*.js"],
  migrations: ["dist/db/migration/*.js"],
  cli: {
    migrationsDir: "src/db/migration",
  },
  namingStrategy: new SnakeNamingStrategy(),
};

// Dev env configuration
const devConfig = {
  logging: ["migration", "warn", "error"],
};

// Prod env configuration
const prodConfig = {};

const testConfig = {
  database: process.env.DB_NAME,
  logging: ["migration", "warn", "error"],
  entities: ["src/db/entity/*.ts"],
  migrations: ["src/db/migration/*.ts"],
};

const getConfig = (env) => {
  if (env === "development") {
    return { ...config, ...devConfig };
  }
  if (env === "production") {
    return { ...config, ...prodConfig };
  }
  if (env === "test") {
    return { ...config, ...testConfig };
  }
  return config;
};

module.exports = {
  ...getConfig(process.env.NODE_ENV),
  getConfig,
};
