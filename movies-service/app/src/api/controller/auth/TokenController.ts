import { Controller, Post, Body } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";

import {TokenRequest} from "@app/model/auth/TokenRequest";
import {TokenResponse} from "@app/model/auth/TokenResponse";

@ApiTags("Auth")
@Controller("/auth")
@ApiExtraModels(TokenRequest, TokenResponse)
export class TokenController {
  @Post("/token")
  @ApiOkResponse({
    status: 200,
    description: "Gets JWT token based on user credentials",
    schema: {
      $ref: getSchemaPath(TokenResponse),
    },
  })
  async token(@Body() _request: TokenRequest): Promise<void> {
    // todo
  }
}
