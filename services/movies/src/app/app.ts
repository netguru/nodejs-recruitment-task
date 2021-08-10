import express from 'express';

import { mountRoutes } from '../providers/routes';
import { genericExceptionHandler, notFoundErrorHandler } from './exceptionHandlers';
import * as db from '../../../../shared/src/providers/db';

const app = express();

app.use(express.json());

mountRoutes(app, '');

app.init = () => {
  db.init();
};

app.use(notFoundErrorHandler);
app.use(genericExceptionHandler);

export default app;
