import { Test, TestingModule } from '@nestjs/testing';
import { SavesController } from './saves.controller';
import { SavesService } from './saves.service';

describe('SavesController', () => {
  let savesController: SavesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SavesController],
      providers: [SavesService],
    }).compile();

    savesController = app.get<SavesController>(SavesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(savesController.getHello()).toBe('Hello World!');
    });
  });
});
