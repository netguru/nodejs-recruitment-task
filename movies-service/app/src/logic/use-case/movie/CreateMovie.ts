import { BadRequestException, Injectable } from "@nestjs/common";

import { Movie } from "@app/db/entity/Movie";
import { MovieRepository } from "@app/db/repository/MovieRepository";
import { OMDBApiClient } from "@app/logic/service/omdb/OMDBApiClient";
import { VerifyUserMovieQuota } from "@app/logic/use-case/movie/VerifyUserMovieQuota";
import { User } from "@app/model/user/User";

@Injectable()
export class CreateMovie {
  constructor(
    private readonly omdbApiClient: OMDBApiClient,
    private readonly verifyUserMovieQuota: VerifyUserMovieQuota,
    private readonly movieRepository: MovieRepository
  ) {}

  async create(title: string, user: User): Promise<Movie> {
    if (!(await this.verifyUserMovieQuota.canCreateMoreMovies(user))) {
      throw new BadRequestException("Movie quota depleted, please wait for new month or upgrade to Premium account");
    }
    const additionalData = await this.omdbApiClient.fetchDataByTitle(title);
    if (!additionalData) {
      throw new BadRequestException("Movie with following title not found in OMDB database");
    }
    const newMovie = new Movie();
    newMovie.createdBy = user.userId;
    newMovie.createdAt = new Date();
    newMovie.director = additionalData.Director;
    newMovie.title = additionalData.Title;
    newMovie.genre = additionalData.Genre;
    newMovie.releasedAt = new Date(additionalData.Released);

    await this.movieRepository.save(newMovie);

    return newMovie;
  }
}
