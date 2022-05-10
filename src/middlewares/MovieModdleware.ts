import { NextFunction, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
import { UserRole } from "../types";
import { APIError } from "../utils/errors";
import { userDataFromRequest } from "../utils/userDataFromRequest";
import { UserMovieAggRepository } from "../repository/UserMovieAggRepository";
import { MAX_MOVIES_BASIC_PER_MONTH } from "../constants";

@Service()
export class MovieMiddleware implements ExpressMiddlewareInterface {
  async use(request: any, _response: Response, next: NextFunction) {
    const userData = userDataFromRequest(request);
    if (!userData) {
      next(new APIError("please login first!", 400));
      return;
    }
    if (userData.role === UserRole.premium) {
      next();
      return;
    }
    const d = new Date();
    const movieAgg = await getCustomRepository(UserMovieAggRepository).findOne({
      userId: userData.userId,
      year: d.getFullYear(),
      month: d.getMonth(),
    });
    if (!movieAgg) {
      next();
      return;
    }
    if (movieAgg.numMovies >= MAX_MOVIES_BASIC_PER_MONTH) {
      next(
        new APIError(
          "You cannot save more movies this month. Wait until next month or upgrade to premium.",
          400
        )
      );
      return;
    }
    next();
  }
}
