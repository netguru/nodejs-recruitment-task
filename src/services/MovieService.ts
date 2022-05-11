import log from "loglevel";
import { Service } from "typedi";
import { Connection, Repository } from "typeorm";
import { InjectConnection, InjectRepository } from "typeorm-typedi-extensions";
import { Movie } from "../models/MoviesModel";
import { UserMovieAgg } from "../models/UserMovieAgg";
import { MovieRepository } from "../repository/MessageRepository";
import { UserMovieAggRepository } from "../repository/UserMovieAggRepository";
import { OMDBApiResponse } from "../types";

@Service()
export class MovieService {
  constructor(
    @InjectConnection()
    private connection: Connection,
    @InjectRepository(Movie)
    private movieRepository: MovieRepository,
    @InjectRepository(UserMovieAgg)
    private userMovieAggRepository: UserMovieAggRepository
  ) {}

  async saveMovie(movieData: OMDBApiResponse, userId: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    const movieRepo = queryRunner.manager.getCustomRepository<
      Repository<Movie>
    >(this.movieRepository as any);
    const userMovieAggRepo = queryRunner.manager.getCustomRepository<
      Repository<UserMovieAgg>
    >(this.userMovieAggRepository as any);
    try {
      let movie = new Movie();
      movie.title = movieData.Title;
      movie.userId = userId;
      movie.director = movieData.Director;
      movie.genre = movieData.Genre;
      movie.released = new Date(movieData.Released);
      movie = await movieRepo.save(movie);

      const d = new Date(),
        year = d.getFullYear(),
        month = d.getMonth();
      const agg = await userMovieAggRepo.findOne({
        userId,
        year,
        month,
      });
      if (!agg) {
        await userMovieAggRepo.save({
          userId,
          year,
          month,
          numMovies: 1,
        });
      } else {
        await userMovieAggRepo.update(
          { userId },
          {
            numMovies: agg.numMovies + 1,
          }
        );
      }
      await queryRunner.commitTransaction();
      return movie;
    } catch (error) {
      log.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getMovies(userId: number) {
    return this.movieRepository.find({
      userId,
    });
  }
}
