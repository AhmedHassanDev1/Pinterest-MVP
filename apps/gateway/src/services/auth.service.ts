import { Inject, Injectable, OnModuleInit } from "@nestjs/common"
import { GRPC_SERVICES } from "@app/shared/constants/grpc.constants";
import * as microservices from "@nestjs/microservices";
import { AuthClient, LoginRequest, RefreshTokenRequest } from "@app/shared/types/proto/auth";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        @Inject(GRPC_SERVICES.AUTH) private client: microservices.ClientGrpc,
    ) { }
    rpc: AuthClient
    onModuleInit() {
        this.rpc = this.client.getService<AuthClient>(GRPC_SERVICES.AUTH)
    }

    async register(data) {
        return await lastValueFrom(this.rpc.register(data));
    }

    async logIn(data: LoginRequest) {
        return await lastValueFrom(this.rpc.logIn(data));
    }

    async refreshToken(data: RefreshTokenRequest) {
        return await lastValueFrom(this.rpc.refreshToken(data));
    }
}
