import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile } from "apps/user/schema/profile.schema";
import { GetAvatarRequest, UploadAvatarRequest } from "@app/shared/types/proto/user";
import { convertTextToMongoID } from "@app/shared/utils/dataTransform";
import { Model } from "mongoose";

@Injectable()
export class AvatarService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
    ) { }

    async getAvater({ userId }: GetAvatarRequest) {
        return await this.profileModel.findOne({ user: convertTextToMongoID(userId) }, { avatar: 1 })
    }

    async UpdateAvatar(data: UploadAvatarRequest) {
        const { userId, ...avatar } = data
        return (await this.profileModel.findOneAndUpdate(
            { user: convertTextToMongoID(userId) },
            { avatar },
            { new: true }))?.avatar



    }
}