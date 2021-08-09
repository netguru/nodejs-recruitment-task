import { getRepository } from 'typeorm';
import { Movie } from '../../../../../shared/src/models/Movie';

export const getAllByUserId = async (userId: number): Promise<Movie[]> => {
  return getRepository(Movie).find({ userId });
};

export const create = async (movie: Movie): Promise<Movie> => {
  return getRepository(Movie).save(movie);
};
