import { GRPC_SERVICES } from "@app/shared/constants/grpc.constants";
import { LikesClient, AddLikeRequest, RemoveLikeRequest } from "@app/shared/types/proto/likes";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as microservices from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class LikeService implements OnModuleInit {
    constructor(
        @Inject(GRPC_SERVICES.LIKES) private client: microservices.ClientGrpc,
    ) { }
    
    likeRPC: LikesClient;

    onModuleInit() {
        this.likeRPC = this.client.getService<LikesClient>(GRPC_SERVICES.LIKES);
    }

    async addLike(data: AddLikeRequest) {
        return await lastValueFrom(this.likeRPC.addLike(data));
    } 

    async removeLike(data: RemoveLikeRequest) {
        return await lastValueFrom(this.likeRPC.removeLike(data));
    }
}
