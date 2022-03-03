/* eslint-disable prettier/prettier */
import { Request } from 'express';
import {IUserToken} from "./user";

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface IRequestWithUser extends Request {
  user: Object;
  header: any;
  method: any;
}
