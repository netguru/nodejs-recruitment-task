import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';
import PrismaService from '../../prisma/prisma.service';
import PrismaUserRepository from './user.repository';

describe('users.repository', () => {
  let prismaRepository: PrismaUserRepository;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    prismaServiceMock = createMock<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        PrismaUserRepository,
      ],
    }).compile();

    prismaRepository = module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  it('should be defined', () => {
    expect(prismaRepository).toBeDefined();
  });

  const data = {
    userId: 232,
    year: 232,
    month: 232,
    numMovies: 232,
    created_at: new Date()
  };

  const resolvedMock: any = {
    id: 1,
    timestamp: new Date('2021-12-20T19:59:48.890Z'),
    ad_id: '1213123123',
    adset_id: '123123123',
    creative_id: '123123123',
    product_set_id: '12312312',
    li_event_id: 'asodkaosdkaoskd',
    campaign_id: 1,
  };

  describe('users create', () => {
    it('should save a user when it receives an user input', async () => {
      jest.spyOn(prismaServiceMock.users, 'create').mockResolvedValue(resolvedMock);

      const newIntegration = await prismaRepository.createUser(data);
      expect(newIntegration).toEqual(resolvedMock);
    });

    it('should throw an error if prisma create throws', async () => {
      jest.spyOn(prismaServiceMock.users, 'create').mockRejectedValueOnce(new Error('any_error'));

      const newIntegration = prismaRepository.createUser(data);

      expect(newIntegration).rejects.toThrow('Error on create user on table users: any_error');
    });
  });

  describe('users getCustomerData', () => {
    it('should return a user when consulted by its id', async () => {
      jest.spyOn(prismaServiceMock.users, 'findFirst').mockResolvedValue(resolvedMock);

      const newIntegration = await prismaRepository.getCustomerData(resolvedMock.id);
      expect(newIntegration).toEqual(resolvedMock);
    });

    it('should throw an error if prisma findUnique throws', async () => {
      jest
        .spyOn(prismaServiceMock.users, 'findFirst')
        .mockRejectedValueOnce(new Error('any_error'));

      const newIntegration = prismaRepository.getCustomerData(data);

      expect(newIntegration).rejects.toThrow('Error find first customer Data on table users: any_error');
    });
  });

  describe('users update', () => {
    it('should update a user when consulted by its id', async () => {
      jest.spyOn(prismaServiceMock.users, 'update').mockResolvedValue(resolvedMock);

      const newIntegration = await prismaRepository.update(resolvedMock.id, 43);
      expect(newIntegration).toEqual(resolvedMock);
    });

    it('should throw an error if prisma update throws', async () => {
      jest
        .spyOn(prismaServiceMock.users, 'update')
        .mockRejectedValueOnce(new Error('any_error'));

      const newIntegration = prismaRepository.update(1, 43);

      expect(newIntegration).rejects.toThrow('Error on update user on table users: any_error');
    });
  });
});
