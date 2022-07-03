import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";

import { Configuration } from "@app/logic/service/configuration/Configuration";
import { Logger } from "@app/logic/service/logger/Logger";
import { TokenRequest } from "@app/model/auth/TokenRequest";
import { TokenResponse } from "@app/model/auth/TokenResponse";

@Injectable()
export class AuthServiceApiClient {
  constructor(private readonly configuration: Configuration, private readonly logger: Logger) {}

  async getToken(request: TokenRequest): Promise<TokenResponse> {
    try {
      this.logger.trace(this, JSON.stringify(request));
      const response = await axios.post<TokenResponse>(`${this.configuration.authServiceApiUrl}/auth`, request, {
        headers: { "Content-Type": "application/json" },
      });
      this.logger.trace(this, JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      this.logger.trace(this, JSON.stringify(e));
      throw new UnauthorizedException();
    }
  }
}
