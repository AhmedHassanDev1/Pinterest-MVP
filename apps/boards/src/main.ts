import { NestFactory } from '@nestjs/core';
import { BoardsModule } from './boards.module';
import { ValidationPipe } from '@nestjs/common';
import { GRPC_PACKAGES } from '@app/shared/constants/grpc.constants';
import { protoFiles } from '@app/shared';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Queues, RABBITMQ_SERVICE } from '@app/shared/constants/RabbitMQ.constansts';

async function bootstrap() {
  const app = await NestFactory.create(BoardsModule);
  app.connectMicroservice(
    {
      transport: Transport.GRPC,
      options: {
        package: GRPC_PACKAGES.BOARDS,
        url: process.env.GRPC_URL,
        protoPath: protoFiles.board
      }
    }
  )
  app.connectMicroservice({
    transport: Transport.RMQ,
    name: RABBITMQ_SERVICE,
    options: {
      urls: [process.env.RMQ_URL],
      queue: Queues.SAVES_QUEUE,
      queueOptions: {
        durable: false
      },
    }
  })

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
  }))

  await app.startAllMicroservices()
  await app.listen(3002);
}
bootstrap();
