import { UserJWT } from '../../../../../shared/src/interfaces/User';
import { Movie } from '../../../../../shared/src/models/Movie';
import { fetchMovieDetails } from '../../../../../shared/src/providers/ombd';
import * as moviesRepository from './moviesRepository';

export const getAllByUserId = async (userId: number): Promise<Movie[]> => {
  return moviesRepository.getAllByUserId(userId);
};

export const create = async (user: UserJWT, title: string): Promise<Movie> => {
  const movie = await fetchMovieDetails(title);
  movie.userId = user.userId;

  return moviesRepository.save(movie);
};
