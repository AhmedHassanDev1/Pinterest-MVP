import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { Profile, ProfileSchema } from '../schema/profile.schema';
import { Follower, FollowerSchema } from '../schema/follower.schema';
import {ProfileService} from "./service/profile.service"
import { UserService } from './service/user.service';
import { AvatarService } from './service/avatar.service';




@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '/apps/user/src/.env'),
      isGlobal: true,
     
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string, ),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }, {
      name: Profile.name,
      schema: ProfileSchema
    }, {
      name: Follower.name,
      schema: FollowerSchema
    }])
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService,ProfileService,AvatarService],
})

export class UserModule { }





