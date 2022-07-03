import { FixturesLoadingException } from "@app/logic/service/typeorm/exception/FixturesLoadingException";

export class InvalidCastTargetException extends FixturesLoadingException {
  constructor(affectedFixtureName: string, affectedFixtureConstructorName: string) {
    super("Invalid target cast type", affectedFixtureName, affectedFixtureConstructorName);
  }
}
