import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception instanceof Error ? 500 : 400;
        response.status(status).json({
            statusCode: status,
            message: 'Error entering information, try again later',
        });
    }
}
