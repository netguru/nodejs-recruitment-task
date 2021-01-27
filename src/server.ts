import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import {authFactory, AuthError} from "./auth";
import authMiddleware from './controllers/AuthMiddleware';
import moviesController from './controllers/MoviesController';
import getSecretJWT from "./lib/getSecretJWT";
const PORT = 3000;

const JWT_SECRET = getSecretJWT();

const auth = authFactory(JWT_SECRET);
const app = express();

app.use(bodyParser.json());

app.post("/auth", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({error: "invalid payload"});
  }

  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({error: "invalid payload"});
  }

  try {
    const token = auth(username, password);

    return res.status(200).json({token});
  } catch (error) {
    //unfortunately, instanceof is not working properly in typescript, source: https://github.com/Microsoft/TypeScript/issues/13965
    if (error.hasOwnProperty('type') && error.type === 'AuthError') {
      return res.status(401).json({error: error.message});
    }

    next(error);
  }
});

app.use(async (error: unknown, _: Request, res: Response, __: NextFunction) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({error: "internal server error"});
});

app.use('/movies', authMiddleware, moviesController);

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
module.exports = app;