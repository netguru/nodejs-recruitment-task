import { Controller, Get, NotImplementedException, Post } from '@nestjs/common';
import { MovieCreateDto, MovieDto } from '../dtos';
import { MovieService } from '../services';

@Controller()
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post('movies')
  async createMovie(userId: string, movie: MovieCreateDto): Promise<MovieDto> {
    throw new NotImplementedException();
  }

  @Get('movies')
  async getMovies(userId: string): Promise<MovieDto[]> {
    throw new NotImplementedException();
  }
}
