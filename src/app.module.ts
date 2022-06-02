// TODO: fix the issue and remove this eslint exception
/* eslint no-shadow: "warn" */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import appConfig from './config/app.config';
import loggerConfig from './config/logger.config';
import HealthController from './app.controller';
import AuthModule from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, loggerConfig, appConfig],
      envFilePath: '.env',
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('logger'),
    }),
    AuthModule
  ],
  controllers: [HealthController],
})
export default class AppModule {}
