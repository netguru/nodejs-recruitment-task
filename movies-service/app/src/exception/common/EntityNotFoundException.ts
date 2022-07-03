import { DomainException } from "@app/exception/common/DomainException";

export class EntityNotFoundException extends DomainException {
  static isString(str: string | object): str is string {
    return str instanceof String;
  }
  constructor(entity: string | object) {
    const name =
      typeof entity === "string" || EntityNotFoundException.isString(entity) ? entity : entity.constructor.name;
    super({
      error: "notFound",
      message: `${name} not found`,
      statusCode: 404,
    });
  }
}
