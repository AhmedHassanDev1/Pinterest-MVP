import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from '../schema/board.schema';
import { Model } from 'mongoose';
import { CreateBoardRequest, DeleteBoardRequest, EditeBoardRequest, GetBoardRequest, ListBoardsRequest, MergeBoardRequest } from '@app/shared/types/proto/boards';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { MergeBoardRequestDTO } from '../dto/board.dto';
import { convertTextToMongoID } from '@app/shared/utils/dataTransform';
import { PaginationHelper } from '@app/shared/utils/helpers/pagination.helper';
import { PaginationRequestDTO } from '@app/shared/dto/pagination.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<Board>,
    private readonly paginationHelper: PaginationHelper

  ) { }

  async createBoard(data: CreateBoardRequest) {
    try {
      return await this.boardModel.create(data)
    } catch (error) {
      if (error.code == 11000) throw new RpcException({ code: status.ALREADY_EXISTS, message: "Try a different name. You already have a board with this name." })
      throw error
    }
  }

  async getBoard({ id }: GetBoardRequest, userId: string) {
    const board = await this.boardModel.findById(id)
    if (!board) throw new RpcException({ code: status.NOT_FOUND, message: "Not Found Board." })
    if (String(board.userId) !== userId && board.private) throw new RpcException({
      code: status.PERMISSION_DENIED,
      message: "You are not authorized to perform access board."
    })
    return board
  }

  async getBoardsByUser({ cursor, limit }: ListBoardsRequest, userId: string) {
    limit = limit || 20
    const query = {
      userId,
      createdAt: cursor ? { $lt: new Date(cursor) } : { $exists: true }
    }

    let boards = await this.boardModel
      .find(query)
      .limit(limit + 1)
      .sort({ createdAt: -1 })

    return this.paginationHelper.genPagination<any>(boards, 20, "boards")
  }

  async deleteBoard({ id }: DeleteBoardRequest, userId: string) {
    let board = await this.boardModel.findById(id)
    if (!board) return { success: true }
    if (String(board?.userId) !== userId)
      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: "You are not authorized to perform delete board."
      })
    await this.boardModel.deleteOne({ _id: id })
    return { success: true }
  }

  async editeBoard({ boardId, ...payload }: EditeBoardRequest, userId: string) {
    let board = await this.boardModel.findById(boardId)
    if (!board) throw new RpcException({
      code: status.NOT_FOUND,
      message: "Not Found Board."
    })

    if (String(board?.userId) !== userId) throw new RpcException({
      code: status.PERMISSION_DENIED,
      message: "You are not authorized to perform edite board."
    })

    return await this.boardModel.findOneAndUpdate(
      { _id: boardId },
      { $set: { ...payload } },
      { new: true })
  }

  async mergeBoard({ mainBoardId, nestBoardId }: MergeBoardRequest, userId: string) {
    const mainBoard = await this.boardModel.findById(mainBoardId)
    const nestBoard = await this.boardModel.findById(nestBoardId)

    if (!mainBoard || !nestBoard) throw new RpcException({ code: status.NOT_FOUND, message: "Not Found Board." })
    if (String(mainBoard?.userId) !== userId || String(nestBoard?.userId) !== userId) throw new RpcException({
      code: status.PERMISSION_DENIED,
      message: "You are not authorized to perform merge board."
    })

    return await this.boardModel.findOneAndUpdate(
      { _id: nestBoardId },
      { $set: { parentBoard: mainBoardId } },
      { new: true })
  }

  async incrementPins(boardId: string) {

    await this.boardModel.updateOne({ _id: convertTextToMongoID(boardId) }, { $inc: { pinsCount: 1 } })
  }
  async decrementPins(boardId: string) {
    await this.boardModel.updateOne({
      $and: [
        { _id: convertTextToMongoID(boardId) },
        { pinsCount: { $gt: 0 } }
      ]
    }, { $inc: { pinsCount: -1 } })
  }
}
