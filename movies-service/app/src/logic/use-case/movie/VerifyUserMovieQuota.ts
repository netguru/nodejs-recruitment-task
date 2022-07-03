import { Injectable } from "@nestjs/common";
import { startOfMonth } from "date-fns";

import { MovieRepository } from "@app/db/repository/MovieRepository";
import { User, UserRole } from "@app/model/user/User";

@Injectable()
export class VerifyUserMovieQuota {
  private readonly quotaPerMonth = 5;

  constructor(private readonly movieRepository: MovieRepository) {}

  async canCreateMoreMovies(user: User): Promise<boolean> {
    if (user.role === UserRole.premium) {
      return true;
    }
    const monthStart = startOfMonth(new Date());
    const count = await this.movieRepository.countMoviesCreatedByUserSince(user, monthStart);
    return count < this.quotaPerMonth;
  }
}
