import { Controller } from '@nestjs/common';
import { SavesService } from './saves.service';
import { GrpcMethod } from '@nestjs/microservices';
import { GRPC_METHODS, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { AddSaveRequestDTO } from '../dto/saves.dto';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class SavesController  {
  constructor(private readonly savesService: SavesService) { }

  @GrpcMethod(GRPC_SERVICES.SAVES, GRPC_METHODS.ADD_SAVE)
  async addSave(data: AddSaveRequestDTO) {
    return await this.savesService.addSave(data)

  }
  @GrpcMethod(GRPC_SERVICES.SAVES, GRPC_METHODS.REMOVE_SAVE)
  async removeSave(data: AddSaveRequestDTO) {
    return await this.savesService.removeSave(data)

  }
}  
