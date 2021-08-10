import { UserJWT } from '../../../../../shared/src/interfaces/User';
import { Movie } from '../../../../../shared/src/models/Movie';
import { BadRequestError, ForbiddenError } from '../../../../../shared/src/utils/errors';
import * as moviesRepository from './moviesRepository';
import * as omdb from '../../../../../shared/src/providers/omdb';

export const getByUserId = async (userId: number): Promise<Movie[]> => {
  return moviesRepository.getByUserId(userId);
};

export const create = async (user: UserJWT, title: string, year: number): Promise<Movie> => {
  if (!title) {
    throw new BadRequestError('Invalid payload');
  }

  if (user.role.toLowerCase() === 'basic') {
    const count = await moviesRepository.countByUserIdCurMonth(user.userId);
    if (count > 4) {
      throw new ForbiddenError('You exceeded your monthly amount of 5 records for basic account');
    }
  }

  const movie = await omdb.fetchMovieDetails(title, year);
  movie.userId = user.userId;

  return moviesRepository.save(movie);
};
