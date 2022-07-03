import { Injectable } from "@nestjs/common";
import chalk from "chalk";

import { Configuration } from "@app/logic/service/configuration/Configuration";
import { prettyPrint } from "@app/logic/service/logger/prettyPrint";

// eslint-disable-next-line
type Source = any;

@Injectable()
export class Logger {
  private effectiveLogLevels: string[];

  public constructor(configuration: Configuration) {
    this.effectiveLogLevels = Logger.getEffectiveLogLevels(configuration.logLevel);
  }

  // yes i know its not the perfect logging solution, normally things would go to separate service

  public error(source: Source, message: string): void {
    if (this.effectiveLogLevels.includes("error")) {
      // eslint-disable-next-line no-console
      console.log(prettyPrint(source, chalk.red(message)));
    }
  }

  public info(source: Source, message: string): void {
    if (this.effectiveLogLevels.includes("log")) {
      // eslint-disable-next-line no-console
      console.log(prettyPrint(source, chalk.white(message)));
    }
  }

  public warn(source: Source, message: string): void {
    if (this.effectiveLogLevels.includes("warn")) {
      // eslint-disable-next-line no-console
      console.log(prettyPrint(source, chalk.yellow(message)));
    }
  }

  public debug(source: Source, message: string): void {
    if (this.effectiveLogLevels.includes("debug")) {
      // eslint-disable-next-line no-console
      console.log(prettyPrint(source, chalk.blue(message)));
    }
  }

  public trace(source: Source, message: string): void {
    if (this.effectiveLogLevels.includes("trace")) {
      // eslint-disable-next-line no-console
      console.log(prettyPrint(source, chalk.gray(message)));
    }
  }

  private static getEffectiveLogLevels(logLevel: string): string[] {
    switch (logLevel) {
      case "none":
        return [];
      case "error":
        return ["error"];
      case "warn":
        return ["error", "warn"];
      case "info":
        return ["error", "warn", "log"];
      case "debug":
        return ["error", "warn", "log", "debug"];
      case "trace":
        return ["error", "warn", "log", "debug", "trace"];
    }
    return ["error", "warn", "log"];
  }
}
