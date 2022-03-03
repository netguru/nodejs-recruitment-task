/* eslint-disable prettier/prettier */
import { NextFunction, Request,  Response } from 'express';
import jwt from 'jsonwebtoken';
import {HttpException} from "../exceptions/HttpException";
import {IRequestWithUser} from "../interfaces/auth.interface";
import {IUserToken} from "../interfaces/user";

const authMiddleware = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.header('Authorization')){
      next(new HttpException(401, "no Authorization header"));
    }
    const Authorization = req.header('Authorization').split('Bearer ')[1] || null;
    if (Authorization) {
      const secretKey: string = process.env.JWT_SECRET;
      const verificationResponse = await jwt.verify(Authorization, secretKey);
      if (verificationResponse) {
        req.user = verificationResponse;
        next();
      } else {
        next(new HttpException(401, 'invalid token'));
      }
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, `Wrong authentication token, ${error}`));
  }
};

export default authMiddleware;
