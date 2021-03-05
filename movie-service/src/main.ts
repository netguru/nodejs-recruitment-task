import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { validationPipeConfig } from 'config';
import { AppModule } from 'modules/app';
import { MongoExceptionFilter, MongooseExceptionFilter } from './filters';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new MongooseExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector, {
      strategy: 'excludeAll',
    }),
  );

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
