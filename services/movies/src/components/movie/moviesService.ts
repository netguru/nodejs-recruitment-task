import { UserJWT } from '../../../../../shared/src/interfaces/User';
import { Movie } from '../../../../../shared/src/models/Movie';
import * as moviesRepository from './moviesRepository';

function fetchData(title: string): Movie {
  const movie = new Movie();
  movie.title = title;
  movie.released = '25 Jun 1982';
  movie.genre = 'Action';
  movie.director = 'Spielberg';
  movie.userId = 1;
  return movie;
}

export const getAll = async (): Promise<Movie[]> => {
  return moviesRepository.getAll();
};

export const create = async (user: UserJWT, title: string): Promise<Movie> => {
  const movie = fetchData(title);
  return moviesRepository.create(movie);
};
