import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import 'dotenv/config';

const HTTP_PORT = 3005;
const LOCALHOST = '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(HTTP_PORT, LOCALHOST);
}

bootstrap();
