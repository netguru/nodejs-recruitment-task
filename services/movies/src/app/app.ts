import express from 'express';

import { mountRoutes } from '../providers/routes';
import { genericExceptionHandler } from './exceptionHandlers';
import * as db from '../../../../shared/src/providers/db';

const app = express();

mountRoutes(app, '');

app.init = () => {
  db.init();
};

app.use(genericExceptionHandler);

export default app;
