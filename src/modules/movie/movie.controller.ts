import { Controller, Post, HttpStatus, Res, Req } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import MovieService from './movie.service';
import 'dotenv/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { userDataToCheck } from "../utils/userDataToCheck";

@Controller('/movie')
export default class Moviecontroller {
  constructor(
    private readonly appService: MovieService
  ) {}

  @Post('/')
  async movieController(
    @Res() response: FastifyReply,
    @Req() request: FastifyRequest,
    @Payload() body): Promise<any> {
      try {
        const userData = userDataToCheck(request);

        const {title} = body;

        await this.appService.movie(title, userData.userId);

        return response.status(HttpStatus.OK).send();
      }
      catch (error) {
        if (error) {
          return response.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
        }
      }
  }
}
