import { Inject, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { protoFiles } from '@app/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { GRPC_PACKAGES, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import {JwtModule} from "@nestjs/jwt"
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '/apps/auth/.env'),
      isGlobal: true
    }),  
    ClientsModule.register([{
      name: GRPC_SERVICES.USER,
      transport: Transport.GRPC,
      options: {
        package: GRPC_PACKAGES.USERS,
        url: process.env.USER_URL,
        protoPath: protoFiles.user
      }
    }]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,ConfigService],
})
export class AuthModule { }
