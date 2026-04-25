import { NestFactory } from '@nestjs/core';
import { LikesModule } from './likes.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GRPC_PACKAGES } from '@app/shared/constants/grpc.constants';
import { protoFiles } from '@app/shared';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(LikesModule); 
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: GRPC_PACKAGES.LIKES,
      url: process.env.GRPC_URL,
      protoPath: protoFiles.likes
    }
  })

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
  }))
  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
