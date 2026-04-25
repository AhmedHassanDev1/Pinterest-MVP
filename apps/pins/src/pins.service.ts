import { Injectable } from '@nestjs/common';
import { CreatePinRequest, GetPinRequest, ListPinsRequest, PinsClient, PinsServer, PinType } from '@app/shared/types/proto/pins';
import { Pin } from '../schema/pin.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { GetListPinsReqeust } from '../dto/pins.dto';
import { PaginationHelper } from '@app/shared/utils/helpers/pagination.helper';

@Injectable()
export class PinsService {
  constructor(
    @InjectModel(Pin.name) private pinModel: Model<Pin>,
    private readonly paginationHelper: PaginationHelper
  ) { }

  async createPin(data: CreatePinRequest) {
    const { type, ...payload } = data
    const pin = {
      ...payload,   
      type: PinType[data.type].toLowerCase()
    }
    return await this.pinModel.create(pin)

  }

  async publish({ id }: GetPinRequest) {
    await this.pinModel.updateOne({ id }, { status: "published" })
    return { success: true }
  }

  async getPinById({ id }: GetPinRequest) {
    let pin = await this.pinModel.findById(id)
    if (!pin) throw new RpcException({ code: status.NOT_FOUND, message: "Not Found Pin." })
    return pin
  }

  async DeletePin({ id }: GetPinRequest, userId: string) {
    let pin = await this.pinModel.findById(id)
    if (!pin) return { success: true }
    if (String(pin?.userId) !== userId)
      throw new RpcException({
        code: status.PERMISSION_DENIED,
        message: "You are not authorized to perform delete pin."
      })
    await this.pinModel.deleteOne({ _id: id })
    return { success: true }
  }

  async getUserPins({ cursor, limit }: GetListPinsReqeust, userId: string) {
    limit = limit || 20
    const query = {
      userId,
      createdAt: cursor ? { $lt: new Date(cursor) } : { $exists: true }
    }

    let pins = await this.pinModel
      .find(query)
      .limit(limit + 1)
      .sort({ createdAt: -1 })

    return this.paginationHelper.genPagination<any>(pins, 20, "pins")
  }

  async incrementLike(pinId: string) {

    await this.pinModel.updateOne(
      {
        _id: pinId,
      }, { $inc: { likesCount: 1 } })

  }

  async decrementLike(pinId: string) {
    await this.pinModel.updateOne({
      _id: pinId,
      likesCount: { $gt: 0 }
    }, { $inc: { likesCount: -1 } })

  }
}
