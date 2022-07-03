import { Injectable } from "@nestjs/common";

import { EnvLoader } from "@app/logic/service/configuration/EnvLoader";

@Injectable()
export class Configuration {
  public readonly isDebugMode: boolean;
  public readonly logLevel: string;
  public readonly jwtSecret: string;

  constructor() {
    this.isDebugMode = EnvLoader.loadOptionalBool("DEBUG_MODE", false);
    this.logLevel = EnvLoader.loadOptionalString("LOG_LEVEL", "error");
    this.jwtSecret = EnvLoader.loadRequiredString("JWT_SECRET");
  }
}
