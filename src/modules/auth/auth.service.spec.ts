import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import AuthService from './auth.service';

describe('AuthCodeService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.spyOn(Logger.prototype, 'debug').mockImplementation(() => 'Error');
    service = createMock<AuthService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Logger,
          useValue: 'Error',
        },
        ConfigService,
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const data = {
    username: '',
    password: '',
  }

  const token = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY1NDE3ODk3MywiZXhwIjoxNjU0MTgwNzczLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.d5d6Qbr8iUpSZQ6NwsxAz6GFOzLEawvx0Naxu0UirEE"
  };

  describe('test auth controller', () => {
    it('pass arguments and see the function be called', async () => {
      const spy = jest.spyOn(service, 'auth').mockResolvedValue(token);
      await service.auth(data.username, data);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(data.username, data);
    });

    const errValidation = {
      message: new Error('Error on create auth'),
    };

    it('failed on validation cache and payload from li', async () => {
      jest.spyOn(service, 'auth').mockRejectedValue(errValidation);
      let expectedError: Error;

      try {
        await service.auth(data.username, data);
      } catch (error) {
        expectedError = error;
      }

      expect(expectedError.message).toStrictEqual(errValidation.message);
    });
  });
});
