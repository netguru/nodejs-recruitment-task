import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import PrismaModule from '../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
})
export default class AuthModule {}
