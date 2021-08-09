import { Movie } from '../../../../../shared/src/models/Movie';
import * as moviesRepository from './moviesRepository';

export const getAll = async (): Promise<Movie[]> => {
  return moviesRepository.getAll();
};

export const create = async (title: string, released: Date, genre: string, director: string): Promise<Movie> => {
  const movie = new Movie();
  movie.title = title;
  movie.released = released;
  movie.genre = genre;
  movie.director = director;
  return moviesRepository.create(movie);
};
