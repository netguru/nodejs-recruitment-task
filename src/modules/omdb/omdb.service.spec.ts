import { Test, TestingModule } from '@nestjs/testing';
import { createMock, createHydratedMock } from 'ts-auto-mock';
import { Logger } from 'nestjs-pino';
import OmdbService from './omdb.service';
// import AddressInput from '../interface/address-input.interface'

describe('IntegrationsService', () => {
  let omdbService: OmdbService;

  beforeAll(async () => {
    omdbService = createMock<OmdbService>();
    jest.spyOn(Logger.prototype, 'debug').mockImplementation(() => 'Error');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Logger,
          useValue: 'Error',
        },
        {
          provide: OmdbService,
          useValue: omdbService,
        },
      ],
    }).compile();

    omdbService = module.get<OmdbService>(OmdbService);
  });

  it('should be defined', () => {
    expect(OmdbService).toBeDefined();
  });

  const payloadMock = createHydratedMock<any>({
    title: 'spider man'
  });

  const response = createHydratedMock<any>({
    "Title": "Thor",
    "Year": "2011",
    "Rated": "PG-13",
    "Released": "06 May 2011",
    "Runtime": "115 min",
    "Genre": "Action, Adventure, Fantasy",
    "Director": "Kenneth Branagh",
    "Writer": "Ashley Miller, Zack Stentz, Don Payne",
    "Actors": "Chris Hemsworth, Anthony Hopkins, Natalie Portman",
    "Plot": "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders."
  });

  it('should pass payload to omdb with success', async () => {
    const spy = jest.spyOn(omdbService, 'getMovieByTitle').mockResolvedValue(response);
    const responseCall = await omdbService.getMovieByTitle(payloadMock);
    expect(spy).toBeCalledWith(payloadMock);
    expect(responseCall).toEqual(response);
  });

  const errOmdb = 'Error calling omdb to get movie by title.';
  it('return error when get address data', async () => {
    jest.spyOn(omdbService, 'getMovieByTitle').mockRejectedValue(new Error(errOmdb));
    let expectedError: Error;

    try {
      await omdbService.getMovieByTitle(payloadMock);
    } catch (error) {
      expectedError = error;
    }

    expect(expectedError).toStrictEqual(new Error(errOmdb));
  });
});
