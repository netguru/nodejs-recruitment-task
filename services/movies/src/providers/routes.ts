import { Express, Request, Response } from 'express';

import { NotFoundError } from '../../../../shared/src/utils/errors';
import moviesRouter from '../components/movie/moviesRouter';

const healthCheckHandler = (req: Request, res: Response): void => {
  res.json({ message: 'Health check - status ok!' });
};

export const mountRoutes = (app: Express, prefix: string): void => {
  app.get(`${prefix}/`, healthCheckHandler);

  app.use(`${prefix}/movies`, moviesRouter);

  app.use((): void => {
    throw new NotFoundError('Endpoint not found');
  });
};
