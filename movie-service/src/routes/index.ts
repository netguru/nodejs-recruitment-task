import { Router } from 'express';
import MovieRoute from "./movie.route";


const routes = Router();

routes.use([
    MovieRoute,
]);

export = routes;