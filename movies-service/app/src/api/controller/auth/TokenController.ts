import { Body, Controller, Post } from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath} from "@nestjs/swagger";

import { AuthServiceApiClient } from "@app/logic/service/auth/AuthServiceApiClient";
import { TokenRequest } from "@app/model/auth/TokenRequest";
import { TokenResponse } from "@app/model/auth/TokenResponse";

@ApiTags("Auth")
@Controller("/auth")
@ApiExtraModels(TokenRequest, TokenResponse)
export class TokenController {
  constructor(private readonly authServiceApiClient: AuthServiceApiClient) {}

  @Post("/token")
  @ApiOperation({ summary: "Get token based on user credentials" })
  @ApiOkResponse({
    status: 200,
    description: "The token",
    schema: {
      $ref: getSchemaPath(TokenResponse),
    },
  })
  async token(@Body() request: TokenRequest): Promise<TokenResponse> {
    return this.authServiceApiClient.getToken(request);
  }
}
