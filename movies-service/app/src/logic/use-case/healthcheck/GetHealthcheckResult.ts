import { Injectable } from "@nestjs/common";

@Injectable()
export class GetHealthcheckResult {
  get(): string {
    return "OK";
  }
}
