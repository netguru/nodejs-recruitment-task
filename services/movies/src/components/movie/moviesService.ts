import { Movie } from '../../models/Movie';
import * as moviesRepository from './moviesRepository';

export const getAll = async (): Promise<Movie[]> => {
  return moviesRepository.getAll();
};

export const create = async (): Promise<Movie> => {
  return moviesRepository.create();
};
