import { Injectable, NotImplementedException } from '@nestjs/common';
import { MovieCreateDto, MovieDto } from '../dtos';
import { MovieRepository } from '../repositories';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async createMovie(userId: string, movie: MovieCreateDto): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  async getUserMovies(userId: string): Promise<MovieDto[]> {
    throw new NotImplementedException();
  }
}
