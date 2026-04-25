import { Injectable } from '@nestjs/common';
import { User } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../../schema/profile.schema';
import { Follower } from '../../schema/follower.schema';
import { Model, Types } from 'mongoose';
import { GetProfileRequest } from '@app/shared/types/proto/user';
import { convertTextToMongoID } from '@app/shared/utils/dataTransform';
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Profile.name) private ProfileModel: Model<Profile>,
    @InjectModel(Follower.name) private FollowerModel: Model<Profile>,
  ) { }

  async getProfileInfo({ userId }: GetProfileRequest) {
    return await this.ProfileModel
      .findOne({ user: new Types.ObjectId(userId) })
      .populate({path:"user",select:"-password"});
  }
 
}

