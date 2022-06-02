import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';
import Moviecontroller from './movie.controller';
import MovieService from './movie.service';
import { FastifyReply, FastifyRequest } from 'fastify';

describe('MovieControllerController', () => {
  let moviecontroller: Moviecontroller;
  let movieService: MovieService;

  beforeEach(async () => {
    movieService = createMock<MovieService>();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Moviecontroller],
      providers: [
        {
          provide: MovieService,
          useValue: movieService,
        }
      ],
    }).compile();

    moviecontroller = module.get<Moviecontroller>(Moviecontroller);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(moviecontroller).toBeDefined();
  });

  const fastifyReplyMock = createMock<FastifyReply>();
  const fastifyRequestMock = createMock<FastifyRequest>();
  let res:any

  it('should call controller', async () => {
    const spy = jest.spyOn(moviecontroller, 'movieControllerCreate').mockResolvedValue(res);
    await moviecontroller.movieControllerCreate(fastifyReplyMock, fastifyRequestMock, {title: 'sa'});
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(fastifyReplyMock, fastifyRequestMock, {title: 'sa'});
  });
});
