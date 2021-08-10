import dotenv from 'dotenv';

dotenv.config();

const environmentalVariables = ['NODE_ENV', 'PORT', 'JWT_SECRET'];

environmentalVariables.forEach((name: string) => {
  if (!process.env[name]) {
    throw new Error(`Missing ${name} environmental variable`);
  }
});
