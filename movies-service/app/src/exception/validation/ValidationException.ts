import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export interface ValidationExceptionResponse {
  type: "validationError";
  data: ValidationError[];
}

export class ValidationException extends BadRequestException {
  override getResponse(): ValidationExceptionResponse {
    return super.getResponse() as ValidationExceptionResponse;
  }
}
