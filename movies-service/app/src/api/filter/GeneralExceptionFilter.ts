import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpError } from "http-errors";

import { DomainException } from "@app/exception/common/DomainException";
import { ValidationException } from "@app/exception/validation/ValidationException";
import { Configuration } from "@app/logic/service/configuration/Configuration";
import { Logger } from "@app/logic/service/logger/Logger";
import { ErrorResponseData } from "@app/model/validation/ErrorResponseData";

interface ErrorInputNode {
  property: string;
  value?: unknown;
  children?: ErrorInputNode[];
  constraints?: { [key: string]: string };
}
interface ErrorOutputNode {
  path: string;
  value: unknown;
  constraints: { [key: string]: string };
}

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  constructor(private readonly configuration: Configuration, private readonly logger: Logger) {}

  catch(error: HttpException | DomainException | Error, host: ArgumentsHost): Response {
    this.logger.trace("GeneralExceptionFilter", `Error: ${JSON.stringify(error, undefined, 4)}`);
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (error instanceof DomainException) {
      this.logger.debug("GeneralExceptionFilter", `DomainException: ${error.getMessage()}`);
      return res.status(error.getStatus()).json(ErrorResponseData.fromDomainException(error));
    }

    if (error instanceof ValidationException) {
      const errorResponse = error.getResponse();
      const statusCode = error.getStatus();
      return res.status(statusCode).json({
        statusCode,
        message: "One or more fields are not valid",
        error: errorResponse.type,
        data: GeneralExceptionFilter.process(errorResponse.data),
      });
    }

    if (error instanceof HttpException) {
      return res.status(error.getStatus()).json(error.getResponse());
    }

    if (error instanceof HttpError) {
      return res.status(error.getStatus()).json(error.getResponse());
    }

    this.logger.error("GeneralExceptionFilter", `Internal: ${error.message}`);
    if (this.configuration.isDebugMode) {
      this.logger.error("GeneralExceptionFilter", error.stack ?? "No stack trace");
      return res.status(500).json({
        error: "internalServer",
        statusCode: 500,
        message: "Internal server error",
        data: error.message,
        stackTrace: error.stack ? error.stack.split("\n").map((a) => a.trim().replace(/^at /, "")) : [],
      });
    } else {
      this.logger.debug("GeneralExceptionFilter", error.stack ?? "No stack trace"); // here log level is different for stacktrace
      return res.status(500).json({
        error: "internalServer",
        statusCode: 500,
        message: "Internal server error",
      });
    }
  }

  private static process(node: ErrorInputNode[]): ErrorOutputNode[] {
    const resultingArray: ErrorOutputNode[] = [];
    const processInner = (path: string, node: ErrorInputNode, arrayPathMode: boolean): void => {
      let jsonPath = path === "" ? node.property : path + "." + node.property;
      if (arrayPathMode) {
        jsonPath = path === "" ? node.property : path + "[" + node.property + "]";
      }
      if (node.constraints) {
        resultingArray.push({
          path: jsonPath,
          value: node.value,
          constraints: node.constraints,
        });
      }
      if (node.children && node.children.length > 0) {
        node.children.map((a) => processInner(jsonPath, a, Array.isArray(node.value)));
      }
    };
    node.map((a) => {
      processInner("", a, Array.isArray(a.value));
    });
    return resultingArray;
  }
}
