import {  NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './exception-filters/pipe-exception.filter';
import { GrpcExceptionFilter } from './exception-filters/grpc-exception.filter';
import cookieParser from 'cookie-parser';
import { corsOptions } from './constants/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors(corsOptions)
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }))
  app.useGlobalFilters(new ValidationExceptionFilter(), new GrpcExceptionFilter())
 
  await app.listen(8001);
}  
bootstrap();   


