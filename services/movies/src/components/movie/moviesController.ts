import { Response, Request } from 'express';

import * as moviesService from './moviesService';

export const getAllByUserId = async (req: Request, res: Response): Promise<void> => {
  const allMovies = await moviesService.getAllByUserId(req.body.user.userId);
  if (!allMovies.length) {
    res.status(204);
  }
  res.json({ data: allMovies });
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const movie = await moviesService.create(req.body.user, req.body.title, req.body.year);
  res.status(201).json({ data: movie });
};
