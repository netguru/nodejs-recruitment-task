import { Express, Request, Response } from 'express';

import moviesRouter from '../components/movie/moviesRouter';
import jwtAuth from '../middlewares/authMiddlewares';

const healthCheckHandler = (req: Request, res: Response): void => {
  res.json({ message: 'Health check - status ok!' });
};

export const mountRoutes = (app: Express, prefix: string): void => {
  app.get(`${prefix}/`, healthCheckHandler);

  app.use(`${prefix}/movies`, jwtAuth, moviesRouter);
};
