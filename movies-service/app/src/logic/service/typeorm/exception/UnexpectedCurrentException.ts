import { FixturesLoadingException } from "@app/logic/service/typeorm/exception/FixturesLoadingException";

export class UnexpectedCurrentException extends FixturesLoadingException {
  constructor(affectedFixtureName: string, affectedFixtureConstructorName: string) {
    super("Unexpected current usage", affectedFixtureName, affectedFixtureConstructorName);
  }
}
