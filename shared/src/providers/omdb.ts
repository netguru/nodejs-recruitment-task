import axios from 'axios';
import { MovieOMDB } from '../interfaces/Movie';

import { Movie } from '../models/Movie';
import { NotFoundError } from '../utils/errors';
import { formatDate } from '../utils/utils';

async function fetchData(title: string, year: number): Promise<MovieOMDB> {
  const params = { t: title, y: year, apikey: process.env.OMDB_API_KEY };
  const { data } = await axios.get(process.env.OMDB_API_URL, { params });

  if (data.Response.toLowerCase() === 'false') {
    throw new NotFoundError(data.Error);
  }

  return data;
}

export async function fetchMovieDetails(title: string, year: number): Promise<Movie> {
  const data = await fetchData(title, year);

  const movie = new Movie();
  movie.title = data.Title;
  movie.released = formatDate(new Date(data.Released));
  movie.genre = data.Genre.split(', ');
  movie.director = data.Director;

  return movie;
}
