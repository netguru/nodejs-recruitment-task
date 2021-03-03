import { MongoError } from 'mongodb';
import { Response } from 'express';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoExceptionFilter.name);

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    this.logger.error(
      `${exception.name}: ${exception.message}`,
      exception.stack,
    );

    res.status(status).json({
      statusCode: status,
      message: `${exception.name}: ${exception.message}`,
      error: 'Bad Request',
    });
  }
}
