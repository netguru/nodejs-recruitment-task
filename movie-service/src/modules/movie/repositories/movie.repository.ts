import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieForCreation } from '../interfaces';
import { Movie } from '../schemas';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel('Movie')
    private debtModel: Model<Movie>,
  ) {}

  async create(movie: MovieForCreation): Promise<Movie> {
    throw new NotImplementedException();
  }

  async getUserMovies(userId: string): Promise<Movie> {
    throw new NotImplementedException();
  }
}
