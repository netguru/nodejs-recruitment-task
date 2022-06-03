import { NextFunction, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { ApiHandle } from '../utils/errors-handle';
import { userDataToCheck } from '../utils/userDataToCheck';
import PrismaUsersRepository from '../auth/repository/user.repository';
import PrismaService from '../prisma/prisma.service';

const prismaService = new PrismaService();
const MAX_MOVIES_PER_MONTH_BASIC = 5;
const BAD_REQUEST = 400;

export default class MovieMiddleware implements ExpressMiddlewareInterface {
  // eslint-disable-next-line class-methods-use-this
  async use(request: any, _response: Response, next: NextFunction) {
    const userData = userDataToCheck(request);
    if (!userData) {
      next(new ApiHandle('please login first!', BAD_REQUEST));
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
          BAD_REQUEST
        )
      );
      return;
    }
    next();
  }
}
