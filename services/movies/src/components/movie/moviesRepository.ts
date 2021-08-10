import { getRepository, MoreThanOrEqual } from 'typeorm';
import { Movie } from '../../../../../shared/src/models/Movie';

export const getByUserId = async (userId: number): Promise<Movie[]> => {
  return getRepository(Movie).find({ userId });
};

export const countByUserIdCurMonth = async (userId: number): Promise<number> => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const where = {
    createdAt: MoreThanOrEqual(`${year}-${month + 1}-01`),
    userId,
  };

  return getRepository(Movie).count({ where });
};

export const save = async (movie: Movie): Promise<Movie> => {
  return getRepository(Movie).save(movie);
};
