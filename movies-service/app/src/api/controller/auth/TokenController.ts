import { Controller, Post, Body } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";

import {TokenRequest} from "@app/model/auth/TokenRequest";
import {TokenResponse} from "@app/model/auth/TokenResponse";
import {AuthServiceApiClient} from "@app/logic/service/auth/AuthServiceApiClient";

@ApiTags("Auth")
@Controller("/auth")
@ApiExtraModels(TokenRequest, TokenResponse)
export class TokenController {

  constructor(private readonly authServiceApiClient: AuthServiceApiClient) { }

  @Post("/token")
  @ApiOkResponse({
    status: 200,
    description: "Gets JWT token based on user credentials",
    schema: {
      $ref: getSchemaPath(TokenResponse),
    },
  })
  async token(@Body() request: TokenRequest): Promise<TokenResponse> {
    return this.authServiceApiClient.getToken(request);
  }
}