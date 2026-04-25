import { Controller, Get } from '@nestjs/common';
import { PinsService } from './pins.service';
import { EventPattern, GrpcMethod, Payload } from '@nestjs/microservices';
import { GRPC_METHODS, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { CreatePinRequestDTO, GetListPinsReqeust, GetPinReqeustDTO } from '../dto/pins.dto';
import { Metadata } from '@grpc/grpc-js';

type ToggleLikeType = {
  userId: string
  pinId: string
}

@Controller()
export class PinsController {
  constructor(private readonly pinsService: PinsService) { }

  @GrpcMethod(GRPC_SERVICES.PINS, GRPC_METHODS.CREATE_PIN)
  async createPin(data: CreatePinRequestDTO) {
    return await this.pinsService.createPin(data)

  }

  @GrpcMethod(GRPC_SERVICES.PINS, GRPC_METHODS.PUBLISH_PIN)
  async publishPin(data: GetPinReqeustDTO) {
    return await this.pinsService.publish(data)
  }

  @GrpcMethod(GRPC_SERVICES.PINS, GRPC_METHODS.GET_PIN)
  async getPinById(data: GetPinReqeustDTO) {
    return await this.pinsService.getPinById(data)
  }

  @GrpcMethod(GRPC_SERVICES.PINS, GRPC_METHODS.DELETE_PIN)
  async DeletePin(data: GetPinReqeustDTO, metadata: Metadata) {
    const [userId] = metadata.get("userId")
    return await this.pinsService.DeletePin(data, userId as string)
  }  

  @GrpcMethod(GRPC_SERVICES.PINS, GRPC_METHODS.LIST_PINS)
  async GetPinsList(data: GetListPinsReqeust, metadata: Metadata) {
    const [userId] = metadata.get("userId")

    return await this.pinsService.getUserPins(data, userId as string)
  }

  @EventPattern("pin.like")
  async like(@Payload() data: ToggleLikeType) {
    const { pinId } = data
    if (!pinId) return;
    return await this.pinsService.incrementLike(pinId)
  }

  @EventPattern("pin.unlike")
  async unlike(@Payload() data: ToggleLikeType) {
    const { pinId } = data
    if (!pinId) return;
    return await this.pinsService.decrementLike(pinId)
  }
  
  @EventPattern("pin.comment")
  async addComment(@Payload() data: ToggleLikeType) {
   
  }
  @EventPattern("pin.delete.comment")
  async removeComment(@Payload() data: ToggleLikeType) {
    
  }
}   
