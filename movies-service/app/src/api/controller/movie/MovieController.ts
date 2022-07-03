import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { Request as ExpressRequest, Response as ExpressResponse } from "express";

import { AuthenticatedUserGuard } from "@app/api/guard/AuthenticatedUserGuard";
import { PaginationDto } from "@app/api/pagination/PaginationDto";
import { PaginationHeadersSetter } from "@app/api/pagination/PaginationHeadersSetter";
import { MoviePresenter } from "@app/api/presenter/movie/MoviePresenter";
import { Movie } from "@app/db/entity/Movie";
import { CreateMovie } from "@app/logic/use-case/movie/CreateMovie";
import { ListUserMovies } from "@app/logic/use-case/movie/ListUserMovies";
import { CreateMovieData } from "@app/model/movie/CreateMovieData";
import { ReadMovieData } from "@app/model/movie/ReadMovieData";
import { User } from "@app/model/user/User";

@ApiTags("Movies")
@Controller("/movies")
@ApiBearerAuth()
@UseGuards(AuthenticatedUserGuard)
@ApiExtraModels(ReadMovieData, CreateMovieData)
export class MovieController {
  constructor(
    private readonly createMovie: CreateMovie,
    private readonly listUserMovies: ListUserMovies,
    private readonly moviePresenter: MoviePresenter
  ) {}

  @Post("/")
  @ApiOkResponse({
    status: 200,
    description: "Movie created",
    schema: {
      $ref: getSchemaPath(ReadMovieData),
    },
  })
  async create(@Req() req: ExpressRequest, @Body() request: CreateMovieData): Promise<ReadMovieData> {
    const user = req.authenticatedUser as User; // null check is in the guard
    return this.moviePresenter.present(await this.createMovie.create(request.title, user));
  }

  @Get("/")
  @ApiOkResponse({
    status: 200,
    description: "Movie created",
    schema: {
      $ref: getSchemaPath(ReadMovieData),
    },
  })
  async list(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Query() pagination: PaginationDto
  ): Promise<ReadMovieData[]> {
    const user = req.authenticatedUser as User; // null check is in the guard
    const movies = await this.listUserMovies.list(user, pagination);
    const result = this.moviePresenter.presentList(movies.getData());
    PaginationHeadersSetter.setPaginationHeaders<Movie[]>(response, pagination, movies);
    return result;
  }
}
