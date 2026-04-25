
import { Test, TestingModule } from '@nestjs/testing';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

describe('LikesController', () => {
  let controller: LikesController;

  const mockLikesService = {
    addLike: jest.fn(),
    removeLike: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers: [
        {
          provide: LikesService,
          useValue: mockLikesService,
        },
      ],
    }).compile();

    controller = module.get<LikesController>(LikesController);
    jest.clearAllMocks();
  });

  // =====================================

  it('should call addLike service', async () => {
    const data = { pinId: '1', userId: 'u1' };

    mockLikesService.addLike.mockResolvedValue({
      success: true,
    });

    const result = await controller.addLike(data);

    expect(mockLikesService.addLike).toHaveBeenCalledWith(data);
    expect(result).toEqual({ success: true });
  });

  // =====================================

  it('should call removeLike service with userId from metadata', async () => {
    const data = { pinId: '1', userId: 'u1' };

    const mockMetadata = {
      get: jest.fn().mockReturnValue(['u1']),
    };

    mockLikesService.removeLike.mockResolvedValue({
      success: true,
    });

    const result = await controller.removeLike(data, mockMetadata as any);

    expect(mockMetadata.get).toHaveBeenCalledWith('userId');

    expect(mockLikesService.removeLike).toHaveBeenCalledWith(
      data,
      'u1',
    );

    expect(result).toEqual({ success: true });
  });

  // =====================================

  it('should handle empty metadata userId', async () => {
    const data = { pinId: '1', userId: 'u1' };

    const mockMetadata = {
      get: jest.fn().mockReturnValue([]),
    };

    mockLikesService.removeLike.mockResolvedValue({
      success: true,
    });

    await controller.removeLike(data, mockMetadata as any);

    expect(mockLikesService.removeLike).toHaveBeenCalledWith(
      data,
      undefined,
    );
  });
});