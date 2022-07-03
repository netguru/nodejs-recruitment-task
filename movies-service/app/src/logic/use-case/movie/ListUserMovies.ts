import {Injectable} from "@nestjs/common";
import {MovieRepository} from "@app/db/repository/MovieRepository";
import {Movie} from "@app/db/entity/Movie";

import {User} from "@app/model/user/User";
import {PaginationDto} from "@app/api/pagination/PaginationDto";
import {PaginatedList} from "@app/model/common/PaginatedList";

@Injectable()
export class ListUserMovies {
  constructor(
    private readonly movieRepository: MovieRepository
  ) { }

  async list(user: User, pagination: PaginationDto): Promise<PaginatedList<Movie[]>> {
    return await this.movieRepository.findByUser(user, pagination);
  }
}
