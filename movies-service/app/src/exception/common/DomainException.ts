export interface DomainExceptionOptions {
  error: string;
  message: string;
  data: object | undefined;
  statusCode: number;
}

export class DomainException {
  options: DomainExceptionOptions = {
    error: "domain",
    message: "Domain error",
    data: undefined,
    statusCode: 400,
  };

  private readonly statusCode: number;

  constructor(options?: Partial<DomainExceptionOptions>) {
    this.options = Object.assign(this.options, options);
    this.statusCode = this.options.statusCode;
  }

  getStatus(): number {
    return this.statusCode;
  }

  getResponse(): object | string {
    return {
      error: this.options,
      message: this.options.message,
      statusCode: this.options.statusCode,
    };
  }

  getMessage(): string {
    return this.options.message;
  }
}
