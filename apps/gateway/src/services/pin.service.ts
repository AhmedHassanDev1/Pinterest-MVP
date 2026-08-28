import { GRPC_SERVICES } from "@app/shared/constants/grpc.constants";
import { CreatePinRequest, PinsClient } from "@app/shared/types/proto/pins";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as microservices from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class PinService implements OnModuleInit {
    constructor(
        @Inject(GRPC_SERVICES.PINS) private client: microservices.ClientGrpc,
    ) { }
    pinRPC: PinsClient

    onModuleInit() {
        this.pinRPC = this.client.getService<PinsClient>(GRPC_SERVICES.PINS)
    }

    async createPin(data) {
        return await lastValueFrom(this.pinRPC.createPin(data))
    } 

    async getPinById(pinId: string) { 
        return await lastValueFrom(this.pinRPC.getPin({ id: pinId }))
    }

   

    async publishPin(pinId: string) {
        return await lastValueFrom(this.pinRPC.getPin({ id: pinId }))
    }

    async listPins(data) {
        return await lastValueFrom(this.pinRPC.listPins(data))
    }

    async deletePin(pinId: string) {
        return await lastValueFrom(this.pinRPC.deletePin({ id: pinId }))
    }
}  