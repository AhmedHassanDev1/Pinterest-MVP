import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { EventPattern, GrpcMethod, Payload } from '@nestjs/microservices';
import { GRPC_METHODS, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { Metadata } from '@grpc/grpc-js';
import { CreateBoardRequestDTO, DeleteBoardDTO, EditeBoardRequestDTO, MergeBoardRequestDTO } from '../dto/board.dto';
import { PaginationRequestDTO } from '@app/shared/dto/pagination.dto';

type ToggleSave = {
  boardId?: string
}

@Controller()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @GrpcMethod(GRPC_SERVICES.BOARDS, GRPC_METHODS.CREATE_BOARD)
  async CreateBoard(data: CreateBoardRequestDTO, metaData: Metadata) {
    return await this.boardsService.createBoard(data)
  }

  @GrpcMethod(GRPC_SERVICES.BOARDS, GRPC_METHODS.DELETE_BOARD)
  async deleteBoard(data: DeleteBoardDTO, metaData: Metadata) {
    const [userId] = metaData.get("userId")
    return await this.boardsService.deleteBoard(data, userId as string)
  }
  @GrpcMethod(GRPC_SERVICES.BOARDS, GRPC_METHODS.GET_BOARD)
  async getBoardById(data: DeleteBoardDTO, metaData: Metadata) {
    const [userId] = metaData.get("userId")
    return await this.boardsService.getBoard(data, userId as string)
  }

  @GrpcMethod(GRPC_SERVICES.BOARDS, GRPC_METHODS.EDITE_BOARD)
  async editBoard(data: EditeBoardRequestDTO, metaData: Metadata) {
    const [userId] = metaData.get("userId")
    return await this.boardsService.editeBoard(data, userId as string)
  }

  @GrpcMethod(GRPC_SERVICES.BOARDS, GRPC_METHODS.MERGE_BOARD)
  async mergeBoard(data: MergeBoardRequestDTO, metaData: Metadata) {
    const [userId] = metaData.get("userId")

    return await this.boardsService.mergeBoard(data, userId as string)
  }
  
  
  @GrpcMethod(GRPC_SERVICES.BOARDS, GRPC_METHODS.GET_LIST_BOARDS)
  async getBoardByUser(data: PaginationRequestDTO, metaData: Metadata){
    console.log(data);
    
    const [userId] = metaData.get("userId") 
    return await this.boardsService.getBoardsByUser(data,userId as string)
  }

  @EventPattern("pins.save")
  async saveInBoard(@Payload() data: ToggleSave) {
    if (!data.boardId) return
    
    this.boardsService.incrementPins(data.boardId)

  }

  @EventPattern("pins.unsave")
  async unsaveInBoard(@Payload() data: ToggleSave) {
    if (!data.boardId) return
    this.boardsService.decrementPins(data.boardId)

  }
}
