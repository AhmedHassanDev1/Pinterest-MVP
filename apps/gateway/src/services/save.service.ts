import { GRPC_SERVICES } from "@app/shared/constants/grpc.constants";
import { SavesClient, AddSaveRequest, RemoveSaveRequest, GetSavesByBoardRequest, GetUnorganizedSavesRequest, CheckSaveRequest } from "@app/shared/types/proto/saves";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as microservices from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class SaveService implements OnModuleInit {
    constructor(
        @Inject(GRPC_SERVICES.SAVES) private client: microservices.ClientGrpc,
    ) { }
    
    saveRPC: SavesClient;

    onModuleInit() {
        this.saveRPC = this.client.getService<SavesClient>(GRPC_SERVICES.SAVES);
    }

    async addSave(data: AddSaveRequest) {
        return await lastValueFrom(this.saveRPC.addSave(data));
    } 

    async removeSave(data: RemoveSaveRequest) {
        return await lastValueFrom(this.saveRPC.removeSave(data));
    }

    async getSavesByBoard(data: GetSavesByBoardRequest) {
        return await lastValueFrom(this.saveRPC.getSavesByBoard(data));
    }

    async getUnorganizedSaves(data: GetUnorganizedSavesRequest) {
        return await lastValueFrom(this.saveRPC.getUnorganizedSaves(data));
    }

    async checkSave(data: CheckSaveRequest) {
        return await lastValueFrom(this.saveRPC.checkSave(data));
    }
}
