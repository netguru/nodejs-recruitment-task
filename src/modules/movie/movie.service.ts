/* eslint-disable no-restricted-syntax */
import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import GetMovieOmdb from "../omdb/omdb.service";
import PrismaMoviesRepository from "./repository/movies.repository";
import PrismaUserRepository from "../auth/repository/user.repository";

@Injectable()
export default class MovieService {
  constructor(
    private readonly logger: Logger,
    private readonly getMovieOmdb: GetMovieOmdb,
    @Inject('MOVIE_REPOSITORY') private readonly prismaMoviesRepository: PrismaMoviesRepository,
    @Inject('USER_REPOSITORY') private readonly prismaUserRepository: PrismaUserRepository
  ) {}

  async movieProccessing(payloadMovie:any, userId: number): Promise<any | null> {
    try {
      const movieDetails = await this.getMovieOmdb.getMovieByTitle(payloadMovie);

      await this.prismaMoviesRepository.createMovie(movieDetails, userId);

      const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth();

      const agg = await this.prismaUserRepository.getCustomerData({userId,year,month});

      if (!agg) {
        await this.prismaUserRepository.createUser({userId,year,month,numMovies: 1});
      } else {
        await this.prismaUserRepository.update(userId, agg.num_movies + 1);
      }

    } catch (error) {
      this.logger.error('Error on create movie processing');
      this.logger.error(error);
      throw Error('Error on create movie processing');
    }
  }

  async movieGetAll(userId: number): Promise<any | null> {
    try {
      return await this.prismaMoviesRepository.getCustomerData(userId);;
    } catch (error) {
      this.logger.error('Error on get Movie by userId');
      this.logger.error(error);
      throw Error('Error on get Movie by userId');
    }
  }
}
