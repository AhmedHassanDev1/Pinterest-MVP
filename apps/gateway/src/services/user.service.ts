import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { GRPC_SERVICES } from "@app/shared/constants/grpc.constants";
import { AvatarsClient, GetUserResponse, ProfilesClient, UploadAvatarRequest, UsersClient } from "@app/shared/types/proto/user";
import * as microservices from "@nestjs/microservices";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { status } from "@grpc/grpc-js";

@Injectable()
export class UserService implements OnModuleInit {
    constructor(
        @Inject(GRPC_SERVICES.USER) private client: microservices.ClientGrpc,
    ) { }

    userRPC: UsersClient
    profileRPC: ProfilesClient
    AvatarRPC: AvatarsClient
    onModuleInit() {
        this.userRPC = this.client.getService<UsersClient>(GRPC_SERVICES.USER)
        this.profileRPC = this.client.getService<ProfilesClient>(GRPC_SERVICES.PROFILE)
        this.AvatarRPC = this.client.getService<AvatarsClient>(GRPC_SERVICES.AVATAR)
    }

    async emailIsExists(email: string) {
        try {
            await lastValueFrom(this.userRPC.getUserByEmail({ email }))
            return { isExists: true }
        } catch (error) {
            console.log(error);
            if (error.code == status.NOT_FOUND) return { isExists: false }
            else throw error

        }
    }

    async getUserById(id: string) {
        let { user } = await lastValueFrom(this.userRPC.getUser({ id }))
        return user

    }

    async getProfileInfo(userId: string) {
        let profile = await lastValueFrom(this.profileRPC.getProfile({ userId }))
        return profile
    }

    async getAvatar(userId: string) {
        let { avatar } = await lastValueFrom(this.AvatarRPC.getAvatar({ userId }))
        return avatar
    }

    async uploadAvatar(data:UploadAvatarRequest) {
        let  avatar  = await lastValueFrom(this.AvatarRPC.uploadAvatar(data))
        return avatar
    }

}