import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Movie } from "../models/MoviesModel";
import { UserMovieAgg } from "../models/UserMovieAgg";
import { MovieRepository } from "../repository/MessageRepository";
import { UserMovieAggRepository } from "../repository/UserMovieAggRepository";
import { OMDBApiResponse } from "../types";

@Service()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: MovieRepository,
    @InjectRepository(UserMovieAgg)
    private userMovieAggRepository: UserMovieAggRepository
  ) {}

  async saveMovie(movieData: OMDBApiResponse, userId: number) {
    let movie = new Movie();
    movie.title = movieData.Title;
    movie.userId = userId;
    movie.director = movieData.Director;
    movie.genre = movieData.Genre;
    movie.released = new Date(movieData.Released);
    movie = await this.movieRepository.save(movie);

    const d = new Date(),
      year = d.getFullYear(),
      month = d.getMonth();
    const agg = await this.userMovieAggRepository.findOne({
      userId,
      year,
      month,
    });
    if (!agg) {
      await this.userMovieAggRepository.save({
        userId,
        year,
        month,
        numMovies: 1,
      });
    } else {
      await this.userMovieAggRepository.update(
        { userId },
        {
          numMovies: agg.numMovies + 1,
        }
      );
    }
    return movie;
  }

  async getMovies(userId: number) {
    return this.movieRepository.find({
      userId,
    });
  }
}
