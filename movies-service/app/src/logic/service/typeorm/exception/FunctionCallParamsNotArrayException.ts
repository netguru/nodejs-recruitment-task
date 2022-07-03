import { FixturesLoadingException } from "@app/logic/service/typeorm/exception/FixturesLoadingException";

export class FunctionCallParamsNotArrayException extends FixturesLoadingException {
  constructor(affectedFixtureName: string, affectedFixtureConstructorName: string) {
    super("Function call params is not an array", affectedFixtureName, affectedFixtureConstructorName);
  }
}
