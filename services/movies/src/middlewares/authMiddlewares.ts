import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ForbiddenError, UnAuthorizedError } from '../../../../shared/src/utils/errors';

export function verify(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    throw new UnAuthorizedError('Missing token');
  }

  try {
    req.body.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    throw new ForbiddenError('Bad token');
  }
}
