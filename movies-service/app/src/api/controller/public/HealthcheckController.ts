import { Controller, Get } from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

import { GetHealthcheckResult } from "@app/logic/use-case/healthcheck/GetHealthcheckResult";

@ApiTags("Healthcheck")
@Controller()
export class HealthcheckController {
  constructor(private readonly getHealthcheckResult: GetHealthcheckResult) {}

  @Get("/healthcheck")
  @ApiOperation({ summary: "Check health" })
  @ApiOkResponse({
    description: "Healthcheck - returns 200 and that's it",
  })
  healthcheck(): string {
    return this.getHealthcheckResult.get();
  }
}
