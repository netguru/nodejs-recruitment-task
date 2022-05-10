import {
  Authorized,
  Body,
  Controller,
  CurrentUser,
  Get,
  Post,
  UseBefore,
} from "routing-controllers";
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
  async saveMovie(
    @Body() { title }: SaveMovieBody,
    @CurrentUser({ required: true }) user: TokenPayload
  ) {
    const movie = await this.omdbService.searchByTitle(title);
    await this.movieService.saveMovie(movie, user.userId);
    return "ok";
  }

  @Get("/")
  async getMovies(@CurrentUser({ required: true }) user: TokenPayload) {
    return this.movieService.getMovies(user.userId);
  }
}
