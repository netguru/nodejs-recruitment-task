export const enum HttpStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export abstract class APIError extends Error {
  constructor(
    readonly name: string,
    readonly httpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    message = 'Internal server error',
  ) {
    super(message);
  }
}

export class BadRequestError extends APIError {
  constructor(message: string) {
    super('BAD_REQUEST', HttpStatusCode.BAD_REQUEST, message);
  }
}

export class UnAuthorizedError extends APIError {
  constructor(message: string) {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends APIError {
  constructor(message: string) {
    super('FORBIDDEN', HttpStatusCode.FORBIDDEN, message);
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super('NOT_FOUND', HttpStatusCode.NOT_FOUND, message);
  }
}

export class ConflictError extends APIError {
  constructor(message: string) {
    super('CONFLICT', HttpStatusCode.CONFLICT, message);
  }
}
