import { Module } from '@nestjs/common';


import { AuthController } from './controller/auth.controller';
import { UserController } from './controller/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { protoFiles } from '@app/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { GRPC_PACKAGES, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './resolvers/user.resolver';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from '@app/shared/guard/AuthGuard.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProfileResolver } from './resolvers/profile.resolver';
import { BoardResolver } from './resolvers/board.resolver';
import { PinResolver } from './resolvers/pin.resolver';
import { PinService } from './services/pin.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '/apps/gateway/src/.env'),
      isGlobal: true
    }),
    JwtModule.register({}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    ClientsModule.register([{
      name: GRPC_SERVICES.AUTH,
      transport: Transport.GRPC,
      options: {
        package: GRPC_PACKAGES.AUTH,
        url: process.env.AUTH_URL,
        protoPath: protoFiles.auth,
      }
    }, {
      name: GRPC_SERVICES.USER,
      transport: Transport.GRPC,
      options: {
        package: GRPC_PACKAGES.USERS,
        url: process.env.User_URL,
        protoPath: protoFiles.user,
      }
    }, 
    {
      name: GRPC_SERVICES.PINS,
      transport: Transport.GRPC,
      options: {
        package: GRPC_PACKAGES.PINS,
        url: process.env.PIN_URL,
        protoPath: protoFiles.pins,
      }
    },
    {
      name: GRPC_SERVICES.BOARDS,
      transport: Transport.GRPC,
      options: {
        package: GRPC_PACKAGES.BOARDS,
        url: process.env.BOARD_URL,
        protoPath: protoFiles.board,
      }

    }])
  ],
  controllers: [AuthController, UserController],
  providers: [
    {
      provide: APP_GUARD,
      inject: [Reflector, JwtService, ConfigService],
      useFactory: (
        reflector: Reflector,
        jwtService: JwtService,
        configService: ConfigService
      ) => {
        return new AuthGuard(reflector, jwtService, configService);
      },
    },
    AuthService,
    UserService,
    PinService,
    UserResolver,
    ProfileResolver,
    PinResolver,
    BoardResolver,
  ]
})
export class GatewayModule { }

