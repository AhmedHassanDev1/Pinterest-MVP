import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';
import { Metadata } from '@grpc/grpc-js';
import { LikesModule } from '../src/likes.module';
import { LikesService } from '../src/likes.service';

describe('LikesService E2E', () => {
  let app: INestApplication;
  let likesService: LikesService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LikesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    likesService = moduleFixture.get<LikesService>(LikesService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should add like via service', async () => {
    const data = { pinId: '1', userId: 'u1' };

    const result = await likesService.addLike(data);

    expect(result).toHaveProperty('pinId', '1');
    expect(result).toHaveProperty('userId', 'u1');
    expect(result).toHaveProperty('createdAt');
  });

  it('should remove like via service', async () => {
    const data = { pinId: '1', userId: 'u1' };

    const result = await likesService.removeLike(data, 'u1');

    expect(result).toEqual({ success: true });
  });

  it('should fail removeLike if user unauthorized', async () => {
    const data = { pinId: '1', userId: 'u1' };

    await expect(
      likesService.removeLike(data, 'otherUser'),
    ).rejects.toThrow();
  });

  // Example of gRPC metadata usage
  it('should remove like via controller with metadata', async () => {
    const controller = app.get('LikesController');
    const data = { pinId: '1', userId: 'u1' };

    const metadata = new Metadata();
    metadata.set('userId', 'u1');

    const result = await controller.removeLike(data, metadata);
    expect(result).toEqual({ success: true });
  });
});