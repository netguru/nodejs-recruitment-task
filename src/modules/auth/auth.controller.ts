import { Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import AuthService from './auth.service';
import 'dotenv/config';
import { FastifyReply } from 'fastify';

@Controller()
export default class Authcontroller {
  constructor(
    private readonly appService: AuthService
  ) {}

  @Post('/auth')
  async authController(@Res() response: FastifyReply, @Payload() body): Promise<any> {
    try {
      const { JWT_SECRET } = process.env;

      if (!JWT_SECRET) {
        throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
      }
      const secret = JWT_SECRET;

      const token = await this.appService.auth(secret, body);

      return response.status(HttpStatus.OK).send({token});

    }
    catch (error) {
      if (error) {
        return response.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
      }
    }
  }
}
