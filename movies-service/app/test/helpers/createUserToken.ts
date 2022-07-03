import {default as jwt} from "jsonwebtoken";
import {UserRole} from "@app/model/user/User";

export const createUserToken = (id: number, secret: string, role: UserRole) => jwt.sign(
  {
    userId: id,
    name: "User",
    role: role,
  },
  secret,
  {
    issuer: "https://www.netguru.com/",
    subject: `${id}`,
    expiresIn: 30 * 60,
  }
);
