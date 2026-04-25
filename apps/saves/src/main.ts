import { NestFactory } from '@nestjs/core';
import { SavesModule } from './saves.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GRPC_PACKAGES } from '@app/shared/constants/grpc.constants';
import { protoFiles } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SavesModule, {
    transport: Transport.GRPC,  
    options: {
      package: GRPC_PACKAGES.SAVES,
      url: process.env.GRPC_URL,
      protoPath: protoFiles.saves 
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
  }))
  await app.listen();
}
bootstrap();
