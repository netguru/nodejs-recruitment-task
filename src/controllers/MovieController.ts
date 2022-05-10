import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Get,
  Post,
  UseBefore,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Inject, Service } from "typedi";
import { MovieMiddleware } from "../middlewares/MovieModdleware";
import { MovieService } from "../services/MovieService";
import { OMDBService } from "../services/OMDBService";
import { TokenPayload } from "../types";
import { SaveMovieBody } from "../validators";

@Controller("/movie")
@Service()
export class MovieController {
  constructor(
    @Inject() private omdbService: OMDBService,
    @Inject() private movieService: MovieService
  ) {}

  @UseBefore(MovieMiddleware)
  @Post("/")
  @Authorized()
  @OpenAPI({
    summary: "Saves a movie in database",
    security: [
      {
        bearerAuth: [""],
      },
    ],
  })
  async saveMovie(
    @Body() { title }: SaveMovieBody,
    @CurrentUser({ required: true }) user: TokenPayload
  ) {
    const movie = await this.omdbService.searchByTitle(title);
    const { id, userId, createdAt, updatedAt, ...rest } =
      await this.movieService.saveMovie(movie, user.userId);
    return rest;
  }

  @Get("/")
  @OpenAPI({
    summary: "Returns a list of all movies by a user",
    security: [
      {
        bearerAuth: [""],
      },
    ],
  })
  async getMovies(@CurrentUser({ required: true }) user: TokenPayload) {
    return this.movieService.getMovies(user.userId);
  }
}
