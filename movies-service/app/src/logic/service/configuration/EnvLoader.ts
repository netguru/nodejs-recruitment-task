import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";

export class EnvLoader {
  public static loadRequiredBool(envKeyName: string): boolean {
    const data = process.env[envKeyName];
    if (!data) {
      throw new RuntimeException(`${envKeyName} env var is missing`);
    }
    return data.trim() === "1";
  }

  public static loadOptionalBool(envKeyName: string, defaultValue: boolean): boolean {
    const data = process.env[envKeyName];
    if (!data) {
      return defaultValue;
    }
    return data.trim() === "1";
  }

  public static loadRequiredString(envKeyName: string): string {
    const data = process.env[envKeyName];
    if (!data) {
      throw new RuntimeException(`${envKeyName} env var is missing`);
    }
    return data;
  }

  public static loadOptionalString(envKeyName: string, defaultValue: string): string {
    const data = process.env[envKeyName];
    if (!data) {
      return defaultValue;
    }
    return data;
  }
}
