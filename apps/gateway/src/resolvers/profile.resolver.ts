import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Profile, Avatar, UpdateAvatarInput } from "../schema/profile.schema";
import { UserService } from "../services/user.service";
import { UploadAvatarRequest } from "@app/shared/types/proto/user";



@Resolver()
export class ProfileResolver {
    constructor(
        private userService: UserService
    ) { }

    @Query(() => Profile)
    async getProfileInfo(@Args("userId") userId: string) {
        return this.userService.getProfileInfo(userId);
    }


    @Query(() => Avatar)
    async getAvatar(@Args("userId") userId: string) {
        return this.userService.getAvatar(userId);
    }

    @Mutation(() => Avatar)
    async updateAvatar(@Args("avatarInput", { type: () => UpdateAvatarInput }) data: UploadAvatarRequest) {
        return await this.userService.uploadAvatar(data);
    }

}