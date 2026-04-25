import { Module } from '@nestjs/common';
import { SavesController } from './saves.controller';
import { SavesService } from './saves.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Save, SaveSchema } from '../schema/save.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPC_PACKAGES, GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { protoFiles } from '@app/shared';
import { Queues, RABBITMQ_SERVICE } from '@app/shared/constants/RabbitMQ.constansts';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '/apps/saves/.env'),
      isGlobal: true,

    }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string,),
    MongooseModule.forFeature([{
      name: Save.name,
      schema: SaveSchema
    }]),
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: GRPC_SERVICES.PINS,
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
          protoPath: protoFiles.board
        }
      }, {
        name: RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL as string],
          queue: Queues.SAVES_QUEUE,
          queueOptions: {
            durable: false
          }, 
        }
      }
    ])
  ],
  controllers: [SavesController],
  providers: [SavesService],
})
export class SavesModule { }
