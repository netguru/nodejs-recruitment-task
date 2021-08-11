import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import moviesRouter from '../components/movie/moviesRouter';
import * as authMiddlewares from '../middlewares/authMiddlewares';
import swaggerDocument from './swagger';

const healthCheckHandler = (req: Request, res: Response): void => {
  res.json({ message: 'Health check - status ok!' });
};

export const mountApi = (app: Express): void => {
  app.get('/', healthCheckHandler);

  app.use('/movies', authMiddlewares.verify, moviesRouter);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
