import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { UserType } from "../types";
import { AuthError } from "../utils/errors";

@Service()
export class AuthService {
  private static users: UserType[] = [
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

  // find user and return jwt
  getToken(username: string, password: string) {
    const user = AuthService.users.find((u) => u.username === username);
    if (!user || user.password !== password) {
      throw new AuthError("username or password is invalid");
    }

    return jwt.sign(
      {
        userId: user.id,
        name: user.name,
        role: user.role,
      },
      process.env.SECRET,
      {
        issuer: "https://www.netguru.com/",
        subject: `${user.id}`,
        expiresIn: 30 * 60,
      }
    );
  }
}
