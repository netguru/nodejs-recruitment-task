import { Controller, Post, HttpStatus, Res, Req, Get } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { FastifyReply, FastifyRequest } from 'fastify';
import MovieService from './movie.service';
import 'dotenv/config';
import { userDataToCheck } from '../utils/userDataToCheck';
import MovieInterface from './interface/movie-controller.interface';

@Controller('/movie')
export default class Moviecontroller {
  constructor(private readonly appService: MovieService) {}

  @Post()
  async movieControllerCreate(
    @Res() response: FastifyReply,
    @Req() request: FastifyRequest,
    @Payload() body: MovieInterface
  ): Promise<any> {
    try {
      const userData = userDataToCheck(request);

      const { title } = body;

      await this.appService.movieProccessing(title, userData.userId);

      return response.status(HttpStatus.OK).send();
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
    }
  }

  @Get('/')
  async movieControllerGet(
    @Res() response: FastifyReply,
    @Req() request: FastifyRequest
  ): Promise<any> {
    try {
      const userData = userDataToCheck(request);

      const data = await this.appService.movieGetAll(userData.userId);

      return response.status(HttpStatus.OK).send(data);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
    }
  }
}
