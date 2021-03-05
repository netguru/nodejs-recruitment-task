import { Error } from 'mongoose';
import { Response } from 'express';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongooseExceptionFilter.name, true);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    this.logger.warn(
      `Mongoose ${exception.name}: ${exception.message}`,
      exception.stack,
    );

    res.status(status).json({
      statusCode: status,
      message: `Mongoose ${exception.name}: ${exception.message}`,
      error: 'Bad Request',
    });
  }
}
