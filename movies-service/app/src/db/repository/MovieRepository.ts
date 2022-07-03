import { EntityRepository, MoreThanOrEqual, Repository } from "typeorm";

import { Movie } from "@app/db/entity/Movie";
import { PaginatedList } from "@app/model/common/PaginatedList";
import { PaginationData } from "@app/model/common/PaginationData";
import { User } from "@app/model/user/User";

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async findByUser(user: User, pagination: PaginationData): Promise<PaginatedList<Movie[]>> {
    const where = {
      createdBy: user.userId,
    };
    const data = await this.find({
      where,
      order: {
        createdAt: "DESC",
      },
      skip: pagination.perPage * (pagination.page - 1),
      take: pagination.perPage,
    });
    const total = await this.count({ where });
    return new PaginatedList<Movie[]>(data, data.length, total);
  }

  async countMoviesCreatedByUserSince(user: User, since: Date): Promise<number> {
    return this.count({
      where: {
        createdAt: MoreThanOrEqual(since),
        createdBy: user.userId,
      },
    });
  }
}
