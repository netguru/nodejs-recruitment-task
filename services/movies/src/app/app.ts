import express from 'express';

import { mountRoutes } from '../providers/routes';
import { genericExceptionHandler, notFoundErrorHandler } from './exceptionHandlers';

const app = express();

mountRoutes(app, '');

app.use(notFoundErrorHandler);
app.use(genericExceptionHandler);

export default app;
