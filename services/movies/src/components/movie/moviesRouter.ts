import { Router } from 'express';

import * as moviesController from './moviesController';

const router = Router();

router.get('', moviesController.getAll);

router.post('', moviesController.create);

export default router;
