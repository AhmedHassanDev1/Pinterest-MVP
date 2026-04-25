import { Controller } from '@nestjs/common';
import { LikesService } from './likes.service';
import { GrpcMethod } from '@nestjs/microservices';
import { GRPC_METHODS, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { ToggleLikeDTO } from '../dto/like.dto';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @GrpcMethod(GRPC_SERVICES.LIKES, GRPC_METHODS.ADD_LIKE)
  async addLike(data: ToggleLikeDTO) {

    return await this.likesService.addLike(data)
  }

  @GrpcMethod(GRPC_SERVICES.LIKES, GRPC_METHODS.REMOVE_LIKE)
  async removeLike(data: ToggleLikeDTO, metaData: Metadata) {
    const [userId] = metaData.get("userId")
    return await this.likesService.removeLike(data, userId as string)
  }
  
}
