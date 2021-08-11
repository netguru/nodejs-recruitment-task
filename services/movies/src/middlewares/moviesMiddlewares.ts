import { NextFunction, Request, Response } from 'express';
import { BadRequestError, errorResponseMessages, ForbiddenError } from '../../../../shared/src/utils/errors';
import * as moviesRepository from '../components/movie/moviesRepository';

export function validatePayload(req: Request, res: Response, next: NextFunction): void {
  if (!req.body.title) {
    throw new BadRequestError(errorResponseMessages.invalidPayload);
  }

  next();
}

export async function validateCredits(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { user } = req.body;
  if (user.role.toLowerCase() === 'basic') {
    const count = await moviesRepository.countByUserIdCurMonth(user.userId);
    if (count > 4) {
      throw new ForbiddenError(errorResponseMessages.exceededQouta);
    }
  }

  next();
}
