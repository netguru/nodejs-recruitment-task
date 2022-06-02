import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';
import PrismaService from '../../prisma/prisma.service';
import PrismaMoviesRepository from './movies.repository';

describe('moviess.repository', () => {
  let prismaRepository: PrismaMoviesRepository;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    prismaServiceMock = createMock<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        PrismaMoviesRepository,
      ],
    }).compile();

    prismaRepository = module.get<PrismaMoviesRepository>(PrismaMoviesRepository);
  });

  it('should be defined', () => {
    expect(prismaRepository).toBeDefined();
  });

  const data = {
    userId: 3232,
    Title: 'Test',
    Released: 2932932,
    Genre: "test",
    Director: "test",
  }

  const resolvedMock = {
    id: 1,
    user_id: 434,
    title: 'Thor',
    released: new Date('2011-05-06T03:00:00.000Z'),
    genre: 'Action, Adventure, Fantasy',
    director: 'Kenneth Branagh',
    created_at: new Date('2011-05-06T03:00:00.000Z'),
    updated_at: null
  }

  let resolveanother:any=  {"created_at": new Date('2011-05-06T03:00:00.000Z'), "director": "Kenneth Branagh", "genre": "Action, Adventure, Fantasy", "id": 1, "released": new Date('2011-05-06T03:00:00.000Z'), "title": "Thor", "updated_at": null, "user_id": 434};

  describe('Movies create', () => {
    it('should save a Movie when it receives an Movie input', async () => {
      jest.spyOn(prismaServiceMock.movies, 'create').mockResolvedValue(resolvedMock);

      const newIntegration = await prismaRepository.createMovie(data, 342);
      expect(newIntegration).toEqual(resolvedMock);
    });

    it('should throw an error if prisma create throws', async () => {
      jest.spyOn(prismaServiceMock.movies, 'create').mockRejectedValueOnce(new Error('any_error'));

      const newIntegration = prismaRepository.createMovie(data, 342);

      expect(newIntegration).rejects.toThrow('Error on create movie on table movies: any_error');
    });
  });

  describe('Movies getCustomerData', () => {
    it('should return a Movie when consulted by its id', async () => {
      jest.spyOn(prismaServiceMock.movies, 'findMany').mockResolvedValue(resolveanother);

      const newIntegration = await prismaRepository.getCustomerData(resolvedMock.id);
      expect(newIntegration).toEqual(resolvedMock);
    });

    it('should throw an error if prisma findUnique throws', async () => {
      jest
        .spyOn(prismaServiceMock.movies, 'findMany')
        .mockRejectedValueOnce(new Error('any_error'));

      const newIntegration = prismaRepository.getCustomerData(1);

      expect(newIntegration).rejects.toThrow('Error find many customer Data on table movies: any_error');
    });
  });
});
