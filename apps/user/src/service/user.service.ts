import { Injectable } from '@nestjs/common';
import { convertTextToMongoID } from '@app/shared/utils/dataTransform';


import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { User } from '../../schema/user.schema';
import { Profile } from '../../schema/profile.schema';
import { Follower } from '../../schema/follower.schema';
import { CreateUserRequest, CreateUserResponse } from '@app/shared/types/proto/user';
import { CreateNewUserDTO } from '@app/shared/dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Profile.name) private ProfileModel: Model<Profile>,
 
  ) { }

  async CreateUser(data:CreateNewUserDTO ) {
    const { email, birthDate } = data

    try {
      const userName = email.split("@")[0];
      let user = await this.UserModel.create({ userName, ...data });
      
      await this.ProfileModel.create({ user: user._id  })
      return { user }
    } catch (err) {

      if (err.code === 11000) {
        throw new RpcException({
          code: status.ALREADY_EXISTS,
          message: "Email already exists"
        });
      }
      throw err;
    }
  }

  async getUserByEmail(email: string) {
    let user = await this.UserModel.findOne({ email })
    if (!user) throw new RpcException({ code: status.NOT_FOUND, message: "not found account." })
    return { user }
  }

  async getUserById(id: string) {
    let user = await this.UserModel.findById(id)

    if (!user) throw new RpcException({ code: status.NOT_FOUND, message: "not found user." })
    return { user }
  }
}

