import {NextFunction, Response, Request} from "express";
import jwt, {VerifyErrors} from "jsonwebtoken";
import getSecretJWT from "../lib/getSecretJWT";


export default function (req: Request, res: Response, next: NextFunction) {
  const JWT_SECRET = getSecretJWT();
  const token = (req.headers["authorization"] || '').slice(7);

  jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: object | undefined) => {
    if (err) {
      res.status(401).json({errors: [{message: "Invalid token"}]});
    } else {
      req.auth = decoded as Auth
      next()
    }
  })

}