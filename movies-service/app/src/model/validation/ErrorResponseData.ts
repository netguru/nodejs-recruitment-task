import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { DomainException } from "@app/exception/common/DomainException";

export class ErrorResponseData {
  // Object.values returns both keys and values, but in our case keys are always string, so we can filter them out
  // additionally, we want status codes >= 400 (errors)
  @ApiProperty({ enum: Object.values(HttpStatus).filter((value) => typeof value !== "string" && value >= 400) })
  statusCode!: HttpStatus;

  @ApiProperty()
  message!: string;

  @ApiProperty()
  error!: string;

  static fromDomainException(exception: DomainException): ErrorResponseData {
    const errorResp = new ErrorResponseData();
    errorResp.statusCode = exception.getStatus();
    errorResp.message = exception.options.message;
    errorResp.error = exception.options.error;

    return errorResp;
  }
}
