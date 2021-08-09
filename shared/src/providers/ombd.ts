import { Movie } from '../models/Movie';
import { formatDate } from '../utils/utils';

export function fetchMovieDetails(title: string): Movie {
  const movie = new Movie();
  movie.title = title;
  movie.released = formatDate(new Date('25 Jun 1982'));
  movie.genre = 'Action';
  movie.director = 'Spielberg';
  return movie;
}
