import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { GetHealthcheckResult } from "@app/logic/use-case/healthcheck/GetHealthcheckResult";

@ApiTags("Healthcheck")
@Controller()
export class HealthcheckController {
  constructor(private readonly getHealthcheckResult: GetHealthcheckResult) {}

  @Get("/healthcheck")
  @ApiOkResponse({
    description: "Healthcheck",
  })
  healthcheck(): string {
    return this.getHealthcheckResult.get();
  }
}
