import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

import './config/default';
import { authFactory, AuthError } from './auth';
import { errorResponseMessages } from '../../../shared/src/utils/errors';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env var. Set it and restart the server');
}

const auth = authFactory(JWT_SECRET);
const app = express();

app.use(bodyParser.json());

app.post('/auth', (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: errorResponseMessages.invalidPayload });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: errorResponseMessages.invalidPayload });
  }

  try {
    const token = auth(username, password);

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }

  return undefined;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error processing request ${err}. See next message for details`);
  console.error(err);

  return res.status(500).json({ error: errorResponseMessages.internalError });
});

export default app;
