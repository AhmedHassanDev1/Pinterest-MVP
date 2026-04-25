import { Test, TestingModule } from '@nestjs/testing';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';

describe('PinsController', () => {
  let pinsController: PinsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PinsController],
      providers: [PinsService],
    }).compile();

    pinsController = app.get<PinsController>(PinsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pinsController.getHello()).toBe('Hello World!');
    });
  });
});
