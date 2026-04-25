import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Save } from '../schema/save.schema';
import { Model } from 'mongoose';
import { AddSaveRequest, RemoveSaveRequest } from '@app/shared/types/proto/saves';
import { RABBITMQ_SERVICE } from '@app/shared/constants/RabbitMQ.constansts';
import * as microservices from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { PinsClient } from '@app/shared/types/proto/pins';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class SavesService implements OnModuleInit {
    constructor(
        @Inject(RABBITMQ_SERVICE) private producer: microservices.ClientProxy,
        @Inject(GRPC_SERVICES.PINS) private clientGrpc: microservices.ClientGrpc,
        @InjectModel(Save.name) private saveModel: Model<Save>
    ) { }

    private pinsService: PinsClient;

    onModuleInit() {
        this.pinsService = this.clientGrpc.getService<PinsClient>(GRPC_SERVICES.PINS)
    }
    async addSave(data: AddSaveRequest) {

        try {
            await lastValueFrom(this.pinsService.getPin({ id: data.pinId }))
            let res = await this.saveModel.updateOne(data, { $setOnInsert: data }, { upsert: true });
            let save = await this.saveModel.findOne({
                userId: data.userId,
                pinId: data.pinId,
                boardId: data?.boardId || null,
            });
            (res.upsertedCount && data?.boardId) && this.producer.emit("pins.save", data)
            return save
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async removeSave(data: RemoveSaveRequest) {
        let res = await this.saveModel.deleteOne(data, { $setOnInsert: data });
        (res.deletedCount && data.boardId) && this.producer.emit("pins.unsave", data)
        return { success: true }
    }
}
