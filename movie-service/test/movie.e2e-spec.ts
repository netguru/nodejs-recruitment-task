/* eslint-disable @typescript-eslint/no-var-requires */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from 'utils/testing-utils';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from 'modules/movie';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        rootMongooseTestModule({
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }),
        MovieModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterEach(async () => {
    await closeInMongodConnection();
    await app.close();
  });

  describe('/movies (GET)', () => {
    it('should return 200 status code', async () => {
      const res = await request(server).get('/movies');
      expect(res.status).toBe(200);
    });
  });
});
