import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from '../schema/like.schema';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { protoFiles } from '@app/shared';
import { GRPC_PACKAGES, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { Queues, RABBITMQ_SERVICE } from '@app/shared/constants/RabbitMQ.constansts';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), "./apps/likes/.env"),
      isGlobal: true
    }),
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: GRPC_SERVICES.PINS,
        options: {
          package: GRPC_PACKAGES.PINS,
          url: process.env.PIN_URL,
          protoPath: protoFiles.pins,
        }
      }, {
        name: RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: Queues.LIKE_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),

    MongooseModule.forRoot(process.env.DATABASE_URL as string,),

    MongooseModule.forFeature([{
      name: Like.name,
      schema: LikeSchema
    }])
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule { }
