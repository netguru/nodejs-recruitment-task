import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserJWT } from '../../../../shared/src/interfaces/User';
import { ForbiddenError, UnAuthorizedError } from '../../../../shared/src/utils/errors';

export default (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) throw new UnAuthorizedError('Missing token');
  else
    jwt.verify(token, process.env.JWT_SECRET, (err: jwt.VerifyErrors, user: UserJWT): void => {
      if (err) throw new ForbiddenError('Bad token');
      else {
        req.body.user = user;
        next();
      }
    });
};
