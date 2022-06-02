import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';
import { Logger } from 'nestjs-pino';
import MovieService from './movie.service';
import PrismaMoviesRepository from "./repository/movies.repository";
import PrismaUserRepository from "../movie/repository/movies.repository";
import GetMovieOmdb from "../omdb/omdb.service";

describe('MovieCodeService', () => {
  let service: MovieService;
  let userRepository: PrismaUserRepository;
  let movieRepository: PrismaMoviesRepository;
  let getMovieOmdb: GetMovieOmdb;

  beforeEach(async () => {
    service = createMock<MovieService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Logger,
          useValue: 'Error',
        },
        {
          provide: 'USER_REPOSITORY',
          useValue: userRepository,
        },
        {
          provide: 'MOVIE_REPOSITORY',
          useValue: movieRepository,
        },
        {
          provide: GetMovieOmdb,
          useValue: getMovieOmdb,
        },
        {
          provide: MovieService,
          useValue: service,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const data = {
    username: '',
    password: ''
  }

  const token = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY1NDE3ODk3MywiZXhwIjoxNjU0MTgwNzczLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.d5d6Qbr8iUpSZQ6NwsxAz6GFOzLEawvx0Naxu0UirEE"
  };

  const response =
    [
      {
        "id": 6,
        "user_id": 434,
        "title": "Thor",
        "released": "2011-05-06T03:00:00.000Z",
        "genre": "Action, Adventure, Fantasy",
        "director": "Kenneth Branagh",
        "created_at": "2022-06-02T20:54:15.868Z",
        "updated_at": null
    }]

  describe('test movie controller', () => {
    it('pass arguments and see the function be called', async () => {
      const spy = jest.spyOn(service, 'movieProccessing').mockResolvedValue(token);
      await service.movieProccessing(data.username, 1232);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(data.username, 1232);
    });

    const errValidation = {
      message: new Error('Error on create movie processing'),
    };

    it('failed on validation cache and payload from li', async () => {
      jest.spyOn(service, 'movieProccessing').mockRejectedValue(errValidation);
      let expectedError: Error;

      try {
        await service.movieProccessing(data.username, 1232);
      } catch (error) {
        expectedError = error;
      }

      expect(expectedError.message).toStrictEqual(errValidation.message);
    });

    it('pass arguments and see the function be called', async () => {
      const spy = jest.spyOn(service, 'movieGetAll').mockResolvedValue(response);
      await service.movieGetAll(1232);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(1232);
    });

    const errValidationUser = {
      message: new Error('Error on get Movie by userId'),
    };

    it('failed on validation cache and payload from li', async () => {
      jest.spyOn(service, 'movieGetAll').mockRejectedValue(errValidationUser);
      let expectedError: Error;

      try {
        await service.movieGetAll(1232);
      } catch (error) {
        expectedError = error;
      }

      expect(expectedError.message).toStrictEqual(errValidationUser.message);
    });
  });
});
