import { registerAs } from '@nestjs/config';
import { Params } from 'nestjs-pino';

export default registerAs(
  'logger',
  (): Params => ({
    pinoHttp: {
      level: 'info',
      name: 'integration-nodejs-recruitment-task',
      prettyPrint:
        process.env.NODE_ENV === 'development'
          ? {
              levelFirst: true,
              ignore: 'pid,time,hostname,context,name',
              messageFormat: '{context} {msg}',
              colorize: true,
              translateTime: true,
            }
          : false,
    },
  })
);
