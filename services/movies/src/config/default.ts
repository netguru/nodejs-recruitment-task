import dotenv from 'dotenv';
import { checkEnvVarsExistence } from '../../../../shared/src/utils/utils';

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

checkEnvVarsExistence(environmentalVariables);
