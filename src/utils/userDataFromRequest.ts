import jwt from "jsonwebtoken";
import { TokenPayload } from "../types";

export const userDataFromRequest = (request: any) => {
  const { authorization } = request.headers || {};
  let token = authorization?.split("Bearer ")[1];
  if (!token) return;

  const userData = jwt.verify(token, process.env.SECRET) as TokenPayload;
  return userData;
};
