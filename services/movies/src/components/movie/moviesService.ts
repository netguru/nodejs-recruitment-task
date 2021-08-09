import { Movie } from '../../../../../shared/src/models/Movie';
import * as moviesRepository from './moviesRepository';

export const getAll = async (): Promise<Movie[]> => {
  return moviesRepository.getAll();
};

export const create = async (title: string): Promise<Movie> => {
  const movie = new Movie();
  movie.title = title;
  movie.released = new Date();
  movie.genre = 'Action';
  movie.director = 'Spielberg';
  movie.userId = 1;
  return moviesRepository.create(movie);
};
