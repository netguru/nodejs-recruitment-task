import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import {Configuration} from "@app/logic/service/configuration/Configuration";
import {default as jwt} from "jsonwebtoken";
import {User} from "@app/model/user/User";

@Injectable()
export class UserExtractionMiddleware implements NestMiddleware {
  constructor(private readonly configuration: Configuration) {}

  async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const bearer = req.headers.authorization;
    if(bearer && bearer.startsWith("Bearer ")){
      const token = bearer.substring("Bearer ".length);
      try {
        const decoded = jwt.verify(token, this.configuration.jwtSecret);
        req.authenticatedUser = decoded as User; // i think this cast is not that crazy considering i know where those tokens are created and how
      } catch (e) {
        req.authenticatedUser = undefined;
      }
    }
    next();
  }
}
