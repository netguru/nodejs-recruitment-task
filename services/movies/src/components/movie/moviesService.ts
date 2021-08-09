import { UserJWT } from '../../../../../shared/src/interfaces/User';
import { Movie } from '../../../../../shared/src/models/Movie';
import { fetchMovieDetails } from '../../../../../shared/src/providers/ombd';
import * as moviesRepository from './moviesRepository';

export const getByUserId = async (userId: number): Promise<Movie[]> => {
  return moviesRepository.getByUserId(userId);
};

export const create = async (user: UserJWT, title: string, year: number): Promise<Movie> => {
  const movie = await fetchMovieDetails(title, year);
  movie.userId = user.userId;

  return moviesRepository.save(movie);
};
