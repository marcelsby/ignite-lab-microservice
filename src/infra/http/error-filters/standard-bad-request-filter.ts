import { NotificationCanceledError } from '@application/use-cases/errors/notification-canceled-error';
import { NotificationNotFoundError } from '@application/use-cases/errors/notification-not-found-error';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { makeStandardResponse } from './factories/standard-response-factory';

@Injectable()
@Catch(NotificationCanceledError, NotificationNotFoundError)
export class StandardBadRequestFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    makeStandardResponse({
      exception,
      request,
      response,
      statusEnum: HttpStatus.BAD_REQUEST,
    });
  }
}
