import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { GRPC_METHODS, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { LogInDTO, RefreshTokenDTO, RegisterDTO } from '@app/shared/dto/Auth.dto';

@Controller()
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @GrpcMethod(GRPC_SERVICES.AUTH, GRPC_METHODS.REGISTER)
   async register(data: RegisterDTO) {
      return await this.authService.register(data)
   }

   @GrpcMethod(GRPC_SERVICES.AUTH, GRPC_METHODS.LOG_IN)
   async logIn(data: LogInDTO) {
      return await this.authService.logIn(data)
   }

   @GrpcMethod(GRPC_SERVICES.AUTH, GRPC_METHODS.REFRESH_TOKEN)
   async refreshToken(data:RefreshTokenDTO) {
    
      return await this.authService.refreshToken(data)
   }
}
