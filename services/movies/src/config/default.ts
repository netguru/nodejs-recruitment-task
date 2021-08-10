import dotenv from 'dotenv';

dotenv.config();

const environmentalVariables = [
  'NODE_ENV',
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
  'JWT_SECRET',
  'OMDB_API_URL',
  'OMDB_API_KEY',
];

environmentalVariables.forEach((name: string) => {
  if (!process.env[name]) {
    throw new Error(`Missing ${name} environmental variable`);
  }
});
