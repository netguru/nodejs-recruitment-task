import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { Request as ExpressRequest } from "express";

import { AuthenticatedUserGuard } from "@app/api/guard/AuthenticatedUserGuard";
import { MePresenter } from "@app/api/presenter/user/MePresenter";
import { ReadMeData } from "@app/model/user/ReadMeData";
import { User } from "@app/model/user/User";

@ApiTags("Me")
@ApiExtraModels(ReadMeData)
@ApiBearerAuth()
@UseGuards(AuthenticatedUserGuard)
@Controller("/me")
export class MeController {
  constructor(private readonly mePresenter: MePresenter) {}

  @Get()
  @ApiOperation({ summary: "Get logged user details" })
  @ApiOkResponse({
    description: "Logged user details",
    schema: {
      $ref: getSchemaPath(ReadMeData),
    },
  })
  async get(@Req() req: ExpressRequest): Promise<ReadMeData> {
    const user = req.authenticatedUser as User; // null check is in the guard
    return this.mePresenter.present(user);
  }
}
