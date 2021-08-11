import dotenv from 'dotenv';
import { checkEnvVarsExistence } from '../../../../shared/src/utils/utils';

dotenv.config();

const environmentalVariables = ['NODE_ENV', 'PORT', 'JWT_SECRET'];

checkEnvVarsExistence(environmentalVariables);
