import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../repositories';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}
}
