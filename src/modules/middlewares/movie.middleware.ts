import { NextFunction, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { ApiHandle } from "../utils/errors-handle";
import { userDataToCheck } from "../utils/userDataToCheck";
import { MAX_MOVIES_PER_MONTH_BASIC } from "../constants";
import PrismaUsersRepository from '../auth/repository/user.repository'
import PrismaService from '../prisma/prisma.service';
const prismaService = new PrismaService();

export default class MovieMiddleware implements ExpressMiddlewareInterface {

  async use(request: any, _response: Response, next: NextFunction) {
    const userData = userDataToCheck(request);
    if (!userData) {
      next(new ApiHandle("please login first!", 400));
      return;
    }
    if (userData.role === 'premium') {
      next();
      return;
    }

    const instantiateObject = new PrismaUsersRepository(prismaService);

    const date = new Date();
    const movieAgg = await instantiateObject.getCustomerData({
      userId: userData.userId,
      year: date.getFullYear(),
      month: date.getMonth(),
    });
    if (!movieAgg) {
      next();
      return;
    }
    if (movieAgg.num_movies >= MAX_MOVIES_PER_MONTH_BASIC) {
      next(
        new ApiHandle(
          "It's not possible to save more than 5 movies. Wait until next month or upgrade to premium.",
          400
        )
      );
      return;
    }
    next();
  }
}
