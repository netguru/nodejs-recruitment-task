import {verify} from "jsonwebtoken";
import { TokenPayload } from "../types";

export const userDataToCheck = (request: any) => {
  const { authorization } = request.headers || {};
  let token = authorization?.split("Bearer ")[1];
  if (!token) return;

  const userData = verify(token, process.env.JWT_SECRET) as TokenPayload;
  return userData;
};
