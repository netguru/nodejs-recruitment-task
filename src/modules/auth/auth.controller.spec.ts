import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';
import Authcontroller from './auth.controller';
import AuthService from './auth.service';
import { FastifyReply } from 'fastify';

describe('AuthControllerController', () => {
  let authcontroller: Authcontroller;
  let authService: AuthService;

  beforeEach(async () => {
    authService = createMock<AuthService>();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Authcontroller],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        }
      ],
    }).compile();

    authcontroller = module.get<Authcontroller>(Authcontroller);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authcontroller).toBeDefined();
  });

  const token = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY1NDE3ODk3MywiZXhwIjoxNjU0MTgwNzczLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.d5d6Qbr8iUpSZQ6NwsxAz6GFOzLEawvx0Naxu0UirEE"
  };
  const data = {
    username: 'ds',
    password: 'ds',
  }
  const fastifyReplyMock = createMock<FastifyReply>();

  it('should call controller', async () => {
    const spy = jest.spyOn(authcontroller, 'authController').mockResolvedValue(token);
    await authcontroller.authController(data, fastifyReplyMock);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(data, fastifyReplyMock);
  });
});
