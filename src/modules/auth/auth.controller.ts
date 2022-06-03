import { Controller, Post, HttpStatus, Res, Body} from '@nestjs/common';
import AuthService from './auth.service';
import 'dotenv/config';
import { FastifyReply } from 'fastify';
import AuthInterface from './interface/auth-input.interface'

@Controller('/auth')
export default class Authcontroller {
  constructor(
    private readonly appService: AuthService
  ) {}

  @Post()
  async authController(@Body() body: AuthInterface, @Res() response: FastifyReply): Promise<any> {
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
