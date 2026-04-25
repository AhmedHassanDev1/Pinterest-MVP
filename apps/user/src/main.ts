import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protoFiles } from '@app/shared';
import { GRPC_PACKAGES } from '@app/shared/constants/grpc.constants';
import { ValidationPipe } from '@nestjs/common';
    
async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule,{
    transport: Transport.GRPC,
    options: {
      package: GRPC_PACKAGES.USERS,
      url: process.env.GRPC_URL, 
      protoPath: protoFiles.user
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
 