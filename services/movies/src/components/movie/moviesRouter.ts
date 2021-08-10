import { Router } from 'express';

import * as moviesController from './moviesController';
import * as moviesMiddlewares from '../../middlewares/moviesMiddlewares';

const router = Router();

router.get('', moviesController.getByUserId);

router.post('', moviesMiddlewares.validatePayload, moviesMiddlewares.validateCredits, moviesController.create);

export default router;
