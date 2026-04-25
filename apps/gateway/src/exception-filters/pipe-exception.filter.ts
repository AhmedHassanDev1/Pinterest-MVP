
import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException } from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const responseContent = exception.getResponse();
        const message = typeof responseContent === 'object' && 'message' in responseContent 
            ? responseContent.message 
            : responseContent;

        return response.status(400).json({
            statusCode: 400,
            message: Array.isArray(message ) ? message[0] : message
        });
    }
}