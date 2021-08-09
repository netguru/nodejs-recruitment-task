import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ForbiddenError, UnAuthorizedError } from '../../../../shared/src/utils/errors';

import config from '../config/default';

export default (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) throw new UnAuthorizedError('Missing token');
  else
    jwt.verify(token, config.JWT_SECRET, (err: jwt.VerifyErrors, user: jwt.JwtPayload): void => {
      if (err) throw new ForbiddenError('Bad token');
      else {
        req.body.user = user;
        next();
      }
    });
};
