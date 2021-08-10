import { UserJWT } from '../../../../../shared/src/interfaces/User';
import { Movie } from '../../../../../shared/src/models/Movie';
import { fetchMovieDetails } from '../../../../../shared/src/providers/ombd';
import { ForbiddenError } from '../../../../../shared/src/utils/errors';
import * as moviesRepository from './moviesRepository';

export const getByUserId = async (userId: number): Promise<Movie[]> => {
  return moviesRepository.getByUserId(userId);
};

export const create = async (user: UserJWT, title: string, year: number): Promise<Movie> => {
  if (user.role.toLowerCase() === 'basic') {
    const count = await moviesRepository.countByUserIdCurMonth(user.userId);
    if (count > 4) {
      throw new ForbiddenError('You exceeded your monthly amount of 5 records for basic account');
    }
  }

  const movie = await fetchMovieDetails(title, year);
  movie.userId = user.userId;

  return moviesRepository.save(movie);
};
