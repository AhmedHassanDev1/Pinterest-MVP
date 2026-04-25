import { Controller } from '@nestjs/common';
import { UserService } from './service/user.service';
import { GRPC_METHODS, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Metadata, status } from '@grpc/grpc-js';
import { CreateNewUserDTO, GetProfileInfoRequestDTO, GetUserByEmailDTO, GetUserByIdDTO } from '@app/shared/dto/user.dto';
import { ProfileService } from './service/profile.service';
import { AvatarService } from './service/avatar.service';
import { GetAvatarRequestDTO, UploadAvatarRequestDTO } from '@app/shared/dto/avatar.dto';



@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly avatarService: AvatarService,

  ) { }
  @GrpcMethod(GRPC_SERVICES.USER, GRPC_METHODS.CREATE_USER)
  async createUser(data: CreateNewUserDTO) {

    return await this.userService.CreateUser(data)
  }

  @GrpcMethod(GRPC_SERVICES.USER, GRPC_METHODS.GET_USER_BY_EMAIL)
  async getUserByEmail({ email }: GetUserByEmailDTO) {
    return await this.userService.getUserByEmail(email)
  }

  @GrpcMethod(GRPC_SERVICES.USER, GRPC_METHODS.GET_USER)
  async getUserById({ id }: GetUserByIdDTO) {
    return await this.userService.getUserById(id)
  }
  @GrpcMethod(GRPC_SERVICES.PROFILE, GRPC_METHODS.GET_PROFILE_INFO)
  async getProfileInfo(data: GetProfileInfoRequestDTO) {
    return await this.profileService.getProfileInfo(data)
  }

  @GrpcMethod(GRPC_SERVICES.AVATAR, GRPC_METHODS.GET_AVATAR)
  async getAvater(data: GetAvatarRequestDTO) {
    return await this.avatarService.getAvater(data)
  }

  @GrpcMethod(GRPC_SERVICES.AVATAR, GRPC_METHODS.UPDATE_AVATAR)
  async UploadAvater(data: UploadAvatarRequestDTO) {
    return await this.avatarService.UpdateAvatar(data)
  }
}
