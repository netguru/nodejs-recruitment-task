import { registerAs } from '@nestjs/config';

const DEFAULT_PORT = 3000;

export interface AppConfig {
  port: number;
  environment: string;
  nodeEnv: string;
  projectName: string;
  loggerLevel: string;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    port: Number(process.env.PORT) || DEFAULT_PORT,
    environment: process.env.ENVIRONMENT || 'development',
    nodeEnv: process.env.NODE_ENV || 'development',
    projectName: 'integration-web',
    loggerLevel: process.env.LOGGER_LEVEL || 'debug',
  })
);
