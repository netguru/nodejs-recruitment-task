import { NextFunction, Request, Response } from 'express';

import { APIError, errorResponseMessages, HttpStatusCode, NotFoundError } from '../../../../shared/src/utils/errors';

export const notFoundErrorHandler = (): void => {
  throw new NotFoundError(errorResponseMessages.endpointNotFound);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const genericExceptionHandler = (err: APIError, req: Request, res: Response, next: NextFunction): void => {
  console.log(err);

  let { httpStatusCode, message } = err;
  if (!httpStatusCode || !message) {
    httpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    message = 'Internal server error';
  }

  res.status(httpStatusCode);
  res.json({ message });
};
