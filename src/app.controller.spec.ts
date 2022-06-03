import { Test, TestingModule } from '@nestjs/testing';
import HealthController from './app.controller';

describe('AppController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(healthController).toEqual({});
    });
  });
});
