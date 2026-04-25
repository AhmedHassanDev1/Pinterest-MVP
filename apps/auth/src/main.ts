import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protoFiles } from '@app/shared';
import { GRPC_PACKAGES } from '@app/shared/constants/grpc.constants';
import { ValidationPipe } from '@nestjs/common';
 
async function bootstrap() { 
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: protoFiles.auth,
      url: process.env.GRPC_URL, 
      package: GRPC_PACKAGES.AUTH 
    }  
  });  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }))
  await app.listen();
}
bootstrap();
console.log(process.env.GRPC_URL );
