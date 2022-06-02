/* eslint-disable no-restricted-syntax */
import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { sign } from "jsonwebtoken";

const users = [
  {
    id: 123,
    role: "basic",
    name: "Basic Thomas",
    username: "basic-thomas",
    password: "sR-_pcoow-27-6PAwCD8",
  },
  {
    id: 434,
    role: "premium",
    name: "Premium Jim",
    username: "premium-jim",
    password: "GBLtTyq3E_UNjFnpo9m6",
  },
];

@Injectable()
export default class AuthService {
  constructor(
    private readonly logger: Logger
  ) {}

  async auth(secret, payload): Promise<any | null> {
    try {
      const user = users.find((u) => u.username === payload.username);

      if (!user || user.password !== payload.password) {
        throw new Error("invalid username or password");
      }

      return sign(
        {
          userId: user.id,
          name: user.name,
          role: user.role,
        },
        secret,
        {
          issuer: "https://www.netguru.com/",
          subject: `${user.id}`,
          expiresIn: 30 * 60,
        }
      );
    } catch (error) {
      this.logger.error('Error on create auth');
      this.logger.error(error);
      throw Error('Error on create auth');
    }
  }
}
