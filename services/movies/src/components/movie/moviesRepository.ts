import { getRepository } from 'typeorm';
import { Movie } from '../../../../../shared/src/models/Movie';

export const getAll = async (): Promise<Movie[]> => {
  return getRepository(Movie).find();
};

export const create = async (movie: Movie): Promise<Movie> => {
  return getRepository(Movie).save(movie);
};
