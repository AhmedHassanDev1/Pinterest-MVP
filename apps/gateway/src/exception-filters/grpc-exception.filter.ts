
import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { code, details} = exception.getError() as any;
    
    let statusCode = 500;
    switch (code) {
      case status.NOT_FOUND:
        statusCode = 404;
        break;
      case status.ALREADY_EXISTS:
        statusCode = 409;
        break;
      case status.INVALID_ARGUMENT:
        statusCode = 400;
        break;
    }

    return response.status(statusCode).json({ statusCode, details });
  }
}