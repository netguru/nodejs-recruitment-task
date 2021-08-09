import { Response, Request } from 'express';

import * as moviesService from './moviesService';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const allMovies = await moviesService.getAll();
  if (!allMovies.length) {
    res.status(204);
  }
  res.json({ data: allMovies });
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const movie = await moviesService.create('Sample title', new Date(), 'Action', 'Spielberg');
  res.status(201).json({ data: movie });
};
