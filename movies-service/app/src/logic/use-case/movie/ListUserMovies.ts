import { Injectable } from "@nestjs/common";

import { PaginationDto } from "@app/api/pagination/PaginationDto";
import { Movie } from "@app/db/entity/Movie";
import { MovieRepository } from "@app/db/repository/MovieRepository";
import { PaginatedList } from "@app/model/common/PaginatedList";
import { User } from "@app/model/user/User";

@Injectable()
export class ListUserMovies {
  constructor(private readonly movieRepository: MovieRepository) {}

  async list(user: User, pagination: PaginationDto): Promise<PaginatedList<Movie[]>> {
    return await this.movieRepository.findByUser(user, pagination);
  }
}
