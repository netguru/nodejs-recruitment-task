import {Controller, Post, Body, Req} from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";

import {ReadMovieData} from "@app/model/movie/ReadMovieData";
import {CreateMovieData} from "@app/model/movie/CreateMovieData";
import {CreateMovie} from "@app/logic/use-case/movie/CreateMovie";
import {Request as ExpressRequest} from "express";
import {User} from "@app/model/user/User";

@ApiTags("Movies")
@Controller("/movies")
@ApiExtraModels(ReadMovieData, CreateMovieData)
export class MovieController {

  constructor(private readonly createMovie: CreateMovie) { }

  @Post("/")
  @ApiOkResponse({
    status: 200,
    description: "Movie created",
    schema: {
      $ref: getSchemaPath(ReadMovieData),
    },
  })
  async token(@Req() req: ExpressRequest, @Body() request: CreateMovieData): Promise<ReadMovieData> {
    const user = req.authenticatedUser as User; // null check is in the guard
    return this.createMovie.create(request.title, user);
  }
}
