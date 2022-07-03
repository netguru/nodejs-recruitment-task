import { Injectable } from "@nestjs/common";

import { AbstractAsyncPresenter } from "@app/api/presenter/AbstractAsyncPresenter";
import {Movie} from "@app/db/entity/Movie";
import {ReadMovieData} from "@app/model/movie/ReadMovieData";

@Injectable()
export class MoviePresenter extends AbstractAsyncPresenter<Movie, ReadMovieData> {
  async present(movie: Movie): Promise<ReadMovieData> {
    return {
      ...movie // by chance those will now be identical
    };
  }
}
