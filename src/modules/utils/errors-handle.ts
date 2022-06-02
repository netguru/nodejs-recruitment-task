export class AuthError extends Error {}

export class ApiHandle extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
