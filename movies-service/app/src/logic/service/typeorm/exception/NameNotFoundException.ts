import { FixturesLoadingException } from "@app/logic/service/typeorm/exception/FixturesLoadingException";

export class NameNotFoundException extends FixturesLoadingException {
  constructor(public notFoundName: string, affectedFixtureName: string, affectedFixtureConstructorName: string) {
    super("Referenced name not found", affectedFixtureName, affectedFixtureConstructorName);
  }
}
