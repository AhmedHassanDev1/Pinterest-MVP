import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from '../schema/like.schema';
import { GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import * as microservices from '@nestjs/microservices';
import { PinsClient } from '@app/shared/types/proto/pins';
import { AddLikeRequest } from '@app/shared/types/proto/likes';
import { lastValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { RABBITMQ_SERVICE } from '@app/shared/constants/RabbitMQ.constansts';

@Injectable()
export class LikesService implements OnModuleInit {
  constructor(
    @Inject(RABBITMQ_SERVICE) private producer: microservices.ClientProxy,
    @InjectModel(Like.name) private likeModel: Model<Like>,
    @Inject(GRPC_SERVICES.PINS) private client: microservices.ClientGrpc
  ) { }



  private pinsService: PinsClient;

  onModuleInit() {
    this.pinsService = this.client.getService<PinsClient>(GRPC_SERVICES.PINS)

  }

  async addLike({ pinId, userId }: AddLikeRequest) {
    try {
      await lastValueFrom(this.pinsService.getPin({ id: pinId }))
      const payload = {
        pinId,
        userId,
        createdAt: new Date()
      }
      let res = await this.likeModel.updateOne(
        { pinId, userId },
        { $setOnInsert: payload },
        { upsert: true }

      );
      // emit event to pins service to increment or decrement likesCount
      res.upsertedCount && this.producer.emit("pin.like", payload)
      return payload
    } catch (error) {
      throw new RpcException(error)
    }

  }

  async removeLike({ pinId, userId }: AddLikeRequest, currentUserId: string) {
    const like = await this.likeModel.findOne({ userId, pinId })
    if (!like) return { success: true }
    if (String(like.userId) !== currentUserId) throw new RpcException({
      code: status.PERMISSION_DENIED,
      message: "You are not authorized to perform delete this like."
    })
    const payload = {
      pinId,
      userId,
      createdAt: new Date()
    }
    let res = await this.likeModel.deleteOne({ userId, pinId })
    res.deletedCount && this.producer.emit("pin.unlike", payload)
    return { success: true }
  }

}
