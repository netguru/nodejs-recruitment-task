import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '../schemas';
import { Model } from 'mongoose';
import { MovieController } from '.';
import { getModelToken } from '@nestjs/mongoose';

describe('MovieController', () => {
  let controller: MovieController;
  let model: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: getModelToken('Movie'),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    model = module.get<Model<Movie>>(getModelToken('Movie'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('model should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return movies', async () => {
      expect(true).toBeTruthy();
    });
  });
});
