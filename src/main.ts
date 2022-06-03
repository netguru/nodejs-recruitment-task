import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import AppModule from './app.module';
import 'dotenv/config';

const HTTP_PORT = 3005;
const LISTEN_HOST = '0.0.0.0';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: process.env.NODE_ENV === 'PRODUCTION',
      })
    );
    await app.listen(HTTP_PORT, LISTEN_HOST);
  } catch (e) {
    console.error(e);
  }
}

bootstrap();
