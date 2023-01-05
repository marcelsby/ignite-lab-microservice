import { StandardErrorResponseViewModel } from '@infra/http/view-models/standard-error-response-view-model';
import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

interface MakeStandardResponseProps {
  exception: Error;
  statusEnum: HttpStatus;
  request: Request;
  response: Response;
}

export function makeStandardResponse({
  exception,
  request,
  response,
  statusEnum,
}: MakeStandardResponseProps) {
  const status = statusEnum.valueOf();

  response.status(status).json(
    StandardErrorResponseViewModel.toHTTP({
      status,
      path: request.url,
      reason: exception.message,
    }),
  );
}
