import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '.';
import { MovieRepository } from '../repositories';

describe('MovieService', () => {
  let service: MovieService;
  let repository: MovieRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: MovieRepository,
          useValue: {
            createDebt: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get<MovieRepository>(MovieRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });
});
