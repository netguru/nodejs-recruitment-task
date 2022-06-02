// import { Test, TestingModule } from '@nestjs/testing';
// import { createMock } from 'ts-auto-mock';
// import Moviecontroller from './movie.controller';
// import MovieService from './movie.service';
// import { FastifyReply } from 'fastify';

// describe('MovieControllerController', () => {
//   let authcontroller: Moviecontroller;
//   let authService: MovieService;

//   beforeEach(async () => {
//     authService = createMock<MovieService>();
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [Moviecontroller],
//       providers: [
//         {
//           provide: MovieService,
//           useValue: authService,
//         }
//       ],
//     }).compile();

//     authcontroller = module.get<Moviecontroller>(Moviecontroller);
//     authService = module.get<MovieService>(MovieService);
//   });

//   it('should be defined', () => {
//     expect(authcontroller).toBeDefined();
//   });

//   const token = {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY1NDE3ODk3MywiZXhwIjoxNjU0MTgwNzczLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.d5d6Qbr8iUpSZQ6NwsxAz6GFOzLEawvx0Naxu0UirEE"
//   };
//   const data = {
//     username: '',
//     password: '',
//   }
//   const fastifyReplyMock = createMock<FastifyReply>();

//   it('should call controller', async () => {
//     const spy = jest.spyOn(authcontroller, 'authController').mockResolvedValue(token);
//     await authcontroller.authController(fastifyReplyMock, data);
//     expect(spy).toBeCalledTimes(1);
//     expect(spy).toBeCalledWith(fastifyReplyMock, data);
//   });

//   it('should call movie service', async () => {
//     const spy = jest.spyOn(authService, 'movie');
//     await authcontroller.authController(fastifyReplyMock, data);
//     expect(spy).toBeCalledTimes(1);
//   });

//   it('should call movie status service', async () => {
//     const spy = jest.spyOn(authService, 'movie');
//     jest.spyOn(authService, 'movie').mockResolvedValue({ success: 'ERROR' });
//     await authcontroller.authController(fastifyReplyMock, data);
//     expect(spy).toBeCalledTimes(1);
//   });
// });
