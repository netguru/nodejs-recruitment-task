import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import appConfig from './config/app.config';
import loggerConfig from './config/logger.config';
import HealthController from './app.controller';
import AuthModule from './modules/auth/auth.module';
import MovieModule from './modules/movie/movie.module';
import MovieMiddlewareModule from './modules/middlewares/movie.middleware';

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
    AuthModule,
    MovieModule
  ],
  controllers: [HealthController],
})

export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MovieMiddlewareModule)
      .forRoutes('movie');
  }
}
